import {
  AccountView,
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
    getTransaction,
  }: {
    user: User;
    list: PutTransactionsRequest | PostTransactionsRequest;
    getTransaction: (props: {
      entities: EntityManager;
      id?: string;
    }) => Promise<Transaction | null>;
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
        let account: Account | null;
        if (accountId) {
          account = await entities.findOneBy(Account, {
            id: accountId,
            budgetId: budgetId,
            userId: user.id,
          });
          if (!account) {
            throw { message: "Account not found", status: 404 };
          }
        } else {
          account = await entities.findOneBy(Account, {
            isDefault: true,
            budgetId: budgetId,
            userId: user.id,
          });
          if (!account) {
            throw { message: "No default account", status: 404 };
          }
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

        const transaction = await getTransaction({
          entities: manager,
          id: transactionId,
        });

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
