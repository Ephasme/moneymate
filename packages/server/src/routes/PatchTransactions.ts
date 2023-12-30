import {
  PatchTransactionsRequestSchema,
  PatchTransactionsResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Account, Allocation, Transaction } from "../entities/index.js";
import { getOrNew } from "../helpers/getOrNew.js";
import { Recurrence } from "../entities/Recurrence.js";

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

          const transaction = await entities.findOne(Transaction, {
            where: {
              id: transactionId,
              userId: user.id,
            },
            relations: ["recurrence"],
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
            if (inputRecurrence === undefined) {
              console.log("test");
              const recurrence = await manager.findOne(Recurrence, {
                where: {
                  id: transaction.recurrence?.id,
                },
                relations: ["transactions"],
              });
              if (recurrence) {
                for (const transaction of recurrence.transactions) {
                  transaction.recurrence = null;
                  await manager.save(Transaction, transaction);
                }
                await manager.delete(Recurrence, recurrence);
              }
            } else {
              const recurrence = await manager.findOneBy(Recurrence, {
                id: inputRecurrence.id,
              });
              if (recurrence) {
                recurrence.frequency = inputRecurrence.frequency;
                recurrence.period = inputRecurrence.period;
                recurrence.startDate = inputRecurrence.startDate;
                recurrence.currentDate = inputRecurrence.currentDate;
                await manager.save(Recurrence, recurrence);
              } else {
                const newRecurrence = new Recurrence();
                newRecurrence.frequency = inputRecurrence.frequency;
                newRecurrence.period = inputRecurrence.period;
                newRecurrence.startDate = inputRecurrence.startDate;
                newRecurrence.currentDate = inputRecurrence.currentDate;
                await manager.save(Recurrence, newRecurrence);
                transaction.recurrence = newRecurrence;
              }
            }

            const { id: transactionId } = await manager.save(
              Transaction,
              transaction
            );

            if (transaction.recurrence) {
            } else {
            }

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
