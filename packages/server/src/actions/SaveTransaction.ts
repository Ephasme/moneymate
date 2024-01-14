import {
  PostTransactionsRequest,
  PutTransactionsRequest,
} from "@moneymate/shared";
import { randomUUID } from "crypto";
import { EntityManager } from "typeorm";
import { Recurrence } from "../entities/Recurrence.js";
import {
  Account,
  Allocation,
  Payee,
  Transaction,
  User,
} from "../entities/index.js";

export const SaveTransaction =
  ({ entities }: { entities: EntityManager }) =>
  async ({
    user,
    list,
  }: {
    user: User;
    list: PutTransactionsRequest | PostTransactionsRequest;
  }) => {
    await entities.transaction(async (manager) => {
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
          throw { message: "Account not found", status: 404 };
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

        let transaction: Transaction | null;
        if (transactionId) {
          transaction = await entities.findOne(Transaction, {
            where: {
              id: transactionId,
              userId: user.id,
            },
            relations: ["allocations"],
          });
        } else {
          transaction = new Transaction();
          transaction.id = randomUUID() ?? transactionId;
        }
        if (!transaction) {
          throw { message: "Transaction not found", status: 404 };
        }

        transaction.userId = user.id;
        transaction.accountId = account.id;
        transaction.budgetId = budgetId;
        transaction.payeeId = newPayee?.id;
        transaction.recurrenceId = newRecurrence?.id;
        transaction.amount = amount.toString();
        transaction.description = description;
        transaction.date = date;
        transaction.status = status;

        if (newPayee) {
          await manager.save(Payee, newPayee);
        }
        if (newRecurrence) {
          await manager.save(Recurrence, newRecurrence);
        }
        await manager.save(Transaction, transaction);

        for (const allocation of transaction.allocations ?? []) {
          await manager.delete(Allocation, allocation.id);
        }

        for (const allocation of allocations) {
          const newAllocation = new Allocation();
          newAllocation.id = randomUUID();
          newAllocation.userId = user.id;
          newAllocation.amount = allocation.amount.toString();
          newAllocation.envelopeId = allocation.envelopeId;
          newAllocation.transactionId = transaction.id;
          newAllocation.date = transaction.date;
          newAllocation.budgetId = budgetId;
          await manager.save(Allocation, newAllocation);
        }
      }
    });
    return null;
  };
