import {
  PatchTransactionsRequestSchema,
  PatchTransactionsResponseInput,
  processPatch,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager, In } from "typeorm";
import { Account, Allocation, Transaction } from "../entities/index.js";

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
          recurrence: inputRecurrence,
          accountId,
          allocations,
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

          const transaction = await entities.findOne(Transaction, {
            where: {
              id: transactionId,
              userId: user.id,
            },
            relations: ["recurrence", "allocations"],
          });

          if (!transaction) {
            return reply.status(404).send({ message: "Transaction not found" });
          }

          transaction.accountId = accountId ?? transaction.accountId;
          transaction.budgetId = budgetId ?? transaction.budgetId;
          transaction.amount = (amount ?? transaction.amount).toString();
          transaction.description = processPatch(
            description,
            transaction.description
          );
          transaction.date = date ?? transaction.date;
          transaction.status = status ?? transaction.status;

          await entities.transaction(async (manager) => {
            await manager.save(Transaction, transaction);

            if (allocations) {
              for (const item of transaction.allocations) {
                await manager.remove(item);
              }
              for (const allocation of allocations) {
                const newAllocation = new Allocation();
                newAllocation.amount = allocation.amount.toString();
                newAllocation.budgetId = transaction.budgetId;
                newAllocation.date = transaction.date;
                newAllocation.transactionId = transaction.id;
                newAllocation.envelopeId = allocation.envelopeId;
                newAllocation.userId = transaction.userId;
                await manager.save(Allocation, newAllocation);
              }
            }
          });
        }
        return null;
      }
    );
    done();
  };
};
