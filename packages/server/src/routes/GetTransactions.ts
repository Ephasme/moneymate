import {
  GetTransactionsParamsSchema,
  GetTransactionsResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Transaction } from "../entities/index.js";
import { transactionView } from "../helpers/transactionView.js";

export const GetTransactions = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.get(
      "/api/budget/:budgetId/transaction",
      async (request, reply): Promise<GetTransactionsResponseInput> => {
        const user = await request.user();
        const { budgetId } = GetTransactionsParamsSchema.parse(request.params);

        const transactions = await entities.find(Transaction, {
          where: { budgetId, userId: user.id },
          relations: [
            "payee",
            "account",
            "recurrence",
            "allocations",
            "allocations.envelope",
          ],
        });

        return transactions.map(transactionView);
      }
    );
    done();
  };
};
