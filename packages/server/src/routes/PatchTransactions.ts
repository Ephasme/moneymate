import {
  Patch,
  PatchTransactionsRequestSchema,
  PatchTransactionsResponseInput,
  processPatch,
} from "@moneymate/shared";
import { randomUUID } from "crypto";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import {
  Account,
  Allocation,
  Payee,
  Transaction,
  User,
} from "../entities/index.js";

const ProcessPayee =
  ({
    manager,
    user,
    transaction,
  }: {
    manager: EntityManager;
    user: User;
    transaction: Transaction;
  }) =>
  async (payee: Patch<string> | undefined) => {
    if (payee?.action === "delete") {
      transaction.payeeId = null;
    }
    if (payee?.action === "edit") {
      const payeeEntity = await manager.findOneBy(Payee, {
        name: payee.value,
      });
      if (!payeeEntity) {
        const newPayee = new Payee();
        newPayee.name = payee.value;
        newPayee.userId = user.id;
        newPayee.budgetId = transaction.budgetId;
        newPayee.id = randomUUID();
        await manager.insert(Payee, newPayee);
        transaction.payeeId = newPayee.id;
      }
      if (payeeEntity) {
        transaction.payeeId = payeeEntity.id;
      }
    }
  };

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
          payee,
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
            await ProcessPayee({
              manager,
              user,
              transaction,
            })(payee);

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
