import {
  CreateTransactionsRequestSchema,
  CreateTransactionsResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import _ from "lodash";
import { EntityManager } from "typeorm";
import { Account, Allocation, Transaction } from "../entities/index.js";
import { getOrNew } from "../helpers/getOrNew.js";
import { randomUUID } from "crypto";

export const CreateTransactions = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.post(
      "/api/transaction",
      async (request, reply): Promise<CreateTransactionsResponse> => {
        const user = await request.user();
        const list = CreateTransactionsRequestSchema.parse(request.body);

        for (const {
          description,
          amount,
          date,
          id: transactionId,
          budgetId,
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

          const transaction = new Transaction();

          transaction.id = randomUUID() ?? transactionId;
          transaction.userId = user.id;
          transaction.accountId = account.id;
          transaction.budgetId = budgetId;
          transaction.amount = amount.toString();
          transaction.description = description;
          transaction.date = date;
          transaction.status = status;

          await entities.transaction(async (manager) => {
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
