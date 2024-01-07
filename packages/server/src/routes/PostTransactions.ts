import {
  PostTransactionsRequestSchema,
  PostTransactionsResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import _, { random } from "lodash";
import { EntityManager } from "typeorm";
import { Account, Allocation, Payee, Transaction } from "../entities/index.js";
import { getOrNew } from "../helpers/getOrNew.js";
import { randomUUID } from "crypto";
import { Recurrence } from "../entities/Recurrence.js";

export const PostTransactions = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.post(
      "/api/transaction",
      async (request, reply): Promise<PostTransactionsResponse> => {
        const user = await request.user();
        const list = PostTransactionsRequestSchema.parse(request.body);

        for (const {
          description,
          amount,
          date,
          id: transactionId,
          budgetId,
          recurrence,
          payee,
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

          const allocatedAmount = _(allocations).reduce(
            (acc, x) => acc + x.amount,
            0n
          );

          if (allocatedAmount > amount) {
            return reply.status(400).send({
              message: `Allocated amount ${allocatedAmount} is bigger than transaction amount ${amount}`,
            });
          }

          let newPayee: Payee | null = null;
          if (payee) {
            newPayee = await entities.findOneBy(Payee, {
              name: payee,
            });
            if (!newPayee) {
              newPayee = new Payee();
              newPayee.id = randomUUID();
              newPayee.name = payee;
              newPayee.budgetId = budgetId;
              newPayee.userId = user.id;
            }
          }

          let newRecurrence: Recurrence | null = null;
          if (recurrence) {
            newRecurrence = new Recurrence();
            newRecurrence.frequency = recurrence.frequency;
            newRecurrence.period = recurrence.period;
            newRecurrence.id = recurrence.id;
            newRecurrence.startDate = recurrence.startDate;
            newRecurrence.currentDate = recurrence.currentDate;
          }

          const transaction = new Transaction();

          transaction.id = randomUUID() ?? transactionId;
          transaction.userId = user.id;
          transaction.accountId = account.id;
          transaction.budgetId = budgetId;
          transaction.payeeId = newPayee?.id;
          transaction.recurrenceId = newRecurrence?.id;
          transaction.amount = amount.toString();
          transaction.description = description;
          transaction.date = date;
          transaction.status = status;

          await entities.transaction(async (manager) => {
            if (newPayee) {
              await manager.save(Payee, newPayee);
            }
            if (newRecurrence) {
              await manager.save(Recurrence, newRecurrence);
            }
            const { id: transactionId } = await manager.save(
              Transaction,
              transaction
            );
            await Promise.all(
              allocations.map(async (allocation) => {
                const [newAllocation] = await getOrNew(
                  manager,
                  user,
                  Allocation,
                  allocation.id
                );
                newAllocation.amount = allocation.amount.toString();
                newAllocation.envelopeId = allocation.envelopeId;
                newAllocation.transactionId = transactionId;
                newAllocation.date = allocation.date ?? transaction.date;
                newAllocation.budgetId = budgetId;
                await manager.save(Allocation, newAllocation);
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
