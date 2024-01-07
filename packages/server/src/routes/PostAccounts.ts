import { randomUUID } from "crypto";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Account } from "../entities/index.js";
import {
  PostAccountsResponse,
  PostAccountsRequestSchema,
} from "@moneymate/shared";

export const PostAccounts = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.post(
      "/api/account",
      async (request, _reply): Promise<PostAccountsResponse> => {
        const user = await request.user();
        const list = PostAccountsRequestSchema.parse(request.body);

        console.log("test2");

        for (const { budgetId, name, id } of list) {
          const envelope = new Account();

          envelope.id = randomUUID() ?? id;
          envelope.userId = user.id;
          envelope.budgetId = budgetId;
          envelope.name = name ?? "New Account";

          await entities.save(Account, envelope);
        }
        return null;
      }
    );
    done();
  };
};
