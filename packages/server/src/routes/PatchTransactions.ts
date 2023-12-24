import {
  PatchTransactionsRequestSchema,
  PatchTransactionsResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Account, Allocation, Transaction } from "../entities/index.js";
import { getOrNew } from "../helpers/getOrNew.js";

export const PatchTransactions = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.patch(
      "/api/transaction",
      async (request, reply): Promise<PatchTransactionsResponseInput> => {
        const user = await request.user();
        const list = PatchTransactionsRequestSchema.parse(request.body);

        for (const {
          description,
          amount,
          date,
          id: transactionId,
          budgetId,
          accountId,
          allocations = [],
          status,
        } of list) {
          const account = await entities.findOneBy(Account, {
            id: accountId,
            budgetId: budgetId,
            userId: user.id,
          });
          if (!account) {
            return reply.status(404).send({ message: "Budget not found" });
          }

          const transaction = await entities.findOneBy(Transaction, {
            id: transactionId,
            userId: user.id,
          });

          if (!transaction) {
            return reply.status(404).send({ message: "Transaction not found" });
          }

          transaction.accountId = accountId ?? transaction.accountId;
          transaction.budgetId = budgetId ?? transaction.budgetId;
          transaction.amount = (amount ?? transaction.amount).toString();
          transaction.description = description ?? transaction.description;
          transaction.date = date ?? transaction.date;
          transaction.status = status ?? transaction.status;

          await entities.transaction(async (manager) => {
            const { id: transactionId } = await manager.save(
              Transaction,
              transaction
            );
            await Promise.all(
              allocations.map(async (allocation) => {
                if (allocation.status === "deleted") {
                } else {
                  const [newAllocation] = await getOrNew(
                    manager,
                    user,
                    Allocation,
                    allocation.id
                  );
                  newAllocation.amount = (
                    allocation.amount ?? newAllocation.amount
                  ).toString();
                  newAllocation.envelopeId =
                    allocation.envelopeId ?? newAllocation.envelopeId;
                  newAllocation.transactionId =
                    transactionId ?? newAllocation.transactionId;
                  newAllocation.date = allocation.date ?? newAllocation.date;
                  newAllocation.budgetId = budgetId ?? newAllocation.budgetId;
                  await manager.save(Allocation, newAllocation);
                }
              })
            );
          });
        }
        return null;
      }
    );
    done();
  };
};
