import { FastifyPluginCallback } from "fastify";
import { SignInRequestSchema } from "@moneymate/shared";
import { EntityManager } from "typeorm";
import { encryptPassword } from "../helpers";
import { User } from "../entities";
import jwt from "jsonwebtoken";

export const SignIn = ({
  entities,
  JWT_SECRET,
}: {
  entities: EntityManager;
  JWT_SECRET: string;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.post("/api/sign-in", async (request, reply) => {
      const { email, password } = SignInRequestSchema.parse(request.body);
      const user = await entities.findOneBy(User, { email });
      if (!user) {
        reply.status(400).send({ message: "Invalid email or password" });
        return;
      }

      if (user.password !== encryptPassword(password, user.salt)) {
        reply.status(400).send({ message: "Invalid email or password" });
        return;
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

      return { token };
    });
    done();
  };
};
