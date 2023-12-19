import env from "env-var";
import { FastifyInstance, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { EntityManager } from "typeorm";
import { User } from "../entities/index.js";
import { tokenDataSchema } from "../types/index.js";

const JWT_SECRET = env.get("JWT_SECRET").required().asString();

export const Authenticator =
  ({ entities }: { entities: EntityManager }) =>
  (app: FastifyInstance) => {
    const getUser = async function (
      request: FastifyRequest
    ): Promise<{ email: string; user: User | undefined } | undefined> {
      const token = request.headers.authorization?.replace("Bearer ", "");
      if (token) {
        const { email } = tokenDataSchema.parse(jwt.verify(token, JWT_SECRET));
        if (!email) throw new Error("No email provided");

        const result = (await entities.findOneBy(User, { email })) ?? undefined;
        return { email, user: result };
      }
    };
    app.decorateRequest("maybeUser", async function (): Promise<
      User | undefined
    > {
      const { user } = (await getUser(this)) ?? {};
      return user ?? undefined;
    });
    app.decorateRequest("user", async function (): Promise<User> {
      const { email, user } = (await getUser(this)) ?? {};
      if (!user) throw new Error(`No user found for email ${email}`);
      return user;
    });
    app.decorateRequest("authenticate", async function (): Promise<void> {
      await getUser(this);
    });
  };
