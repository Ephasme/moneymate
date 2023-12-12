import { randomUUID } from "crypto";
import {
  SaveAccountRequestSchema,
  SaveAccountResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Account } from "../entities";
import { Budget } from "../entities/Budget";
import { getOrNew } from "../helpers/getOrNew";

export const SaveAccount = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.post(
      "/api/account",
      async (request, reply): Promise<SaveAccountResponse> => {
        const user = await request.user();
        const {
          name,
          id: accountId,
          budgetId,
        } = SaveAccountRequestSchema.parse(request.body);

        const budget = await entities.findOneBy(Budget, { id: budgetId });
        if (!budget) {
          return reply.status(404).send({ message: "Budget not found" });
        }

        const [account] = await getOrNew(entities, user, Account, accountId);

        account.name = name;
        account.budgetId = budget.id;

        await entities.save(Account, account);
        return { id: account.id };
      }
    );
    done();
  };
};
