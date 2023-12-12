import { randomUUID } from "crypto";
import { SignUpRequestSchema, SignUpResponse } from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import jwt from "jsonwebtoken";
import { EntityManager } from "typeorm";
import { User } from "../entities";
import { createSalt } from "../helpers/createSalt";
import { encryptPassword } from "../helpers";

export const SignUp = ({
  entities,
  JWT_SECRET,
}: {
  entities: EntityManager;
  JWT_SECRET: string;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.post(
      "/api/sign-up",
      async (request, reply): Promise<SignUpResponse | undefined> => {
        const { email, password, passwordConfirmation } =
          SignUpRequestSchema.parse(request.body);

        if (password !== passwordConfirmation) {
          reply.status(400).send({ message: "Passwords do not match" });
          return;
        }

        const existingUser = await entities.findOneBy(User, { email });
        if (existingUser) {
          reply.status(400).send({ message: "Email already in use" });
          return;
        }

        const salt = createSalt();
        const user = new User();
        user.id = randomUUID();
        user.email = email;
        user.password = encryptPassword(password, salt);
        user.salt = salt;

        await entities.save(user);

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

        return { id: user.id, token };
      }
    );
    done();
  };
};
