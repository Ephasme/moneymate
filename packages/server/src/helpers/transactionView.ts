import { TransactionViewInput } from "@moneymate/shared";
import { Transaction } from "../entities";
import { allocationView } from "./allocationView";
import { sumBy } from "./sumBy";

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
    fullyAllocated: sumAllocs === BigInt(x.amount),
    unallocatedAmount: unallocated.toString(),
  };
};
