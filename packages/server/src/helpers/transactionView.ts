import { TransactionViewInput } from "@moneymate/shared";
import { Transaction } from "../entities/index.js";
import { allocationView } from "./allocationView.js";
import { sumBy } from "./sumBy.js";

export const transactionView = (x: Transaction): TransactionViewInput => {
  const allocations = x.allocations.map(allocationView);
  const sumAllocs = sumBy(x.allocations, (x) => x.amount);
  const unallocated = BigInt(x.amount) - sumAllocs;
  return {
    id: x.id,
    accountId: x.accountId,
    accountName: x.account.name,
    amount: x.amount,
    description: x.description,
    status: x.status,
    date: x.date.toISOString(),
    payee: x.payee?.name,
    allocations,
    recurrence: !x.recurrence
      ? undefined
      : {
          ...x.recurrence,
          startDate: x.recurrence.startDate.toISOString(),
          currentDate: x.recurrence.currentDate.toISOString(),
        },
    fullyAllocated: sumAllocs === BigInt(x.amount),
    unallocatedAmount: unallocated.toString(),
  };
};
