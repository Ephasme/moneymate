import {
  GetAccountsParamsSchema,
  GetAccountsResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Account } from "../entities/index.js";

export const GetAccounts = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.get(
      "/api/budget/:budgetId/account",
      async (request, reply): Promise<GetAccountsResponseInput> => {
        const user = await request.user();
        const { budgetId } = GetAccountsParamsSchema.parse(request.params);

        const accounts = await entities.findBy(Account, {
          budgetId,
          userId: user.id,
        });

        return accounts.map((account) => ({
          id: account.id,
          name: account.name,
          clearedBalance: "0",
          pendingBalance: "0",
        }));
      }
    );
    done();
  };
};
