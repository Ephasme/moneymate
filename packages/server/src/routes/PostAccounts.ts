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

        for (const { budgetId, name, id } of list) {
          const count = await entities.countBy(Account, {
            userId: user.id,
            budgetId: budgetId,
          });

          const envelope = new Account();

          if (count === 0) {
            envelope.isDefault = true;
          }
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
