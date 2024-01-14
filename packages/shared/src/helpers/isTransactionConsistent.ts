import { TransactionView } from "../views/TransactionViewSchema.js";
import { bim } from "./bim.js";

export const isTransactionConsistent = (
  transaction: TransactionView
): boolean => {
  const totalAllocated = bim.sumBy(transaction.allocations, (x) => x.amount);
  return transaction.amount === totalAllocated;
};
