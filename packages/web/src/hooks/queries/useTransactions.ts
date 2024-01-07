import { useQuery } from "@tanstack/react-query";
import { queries } from "./queries";

export const useTransactions = (budgetId: string) => {
  return useQuery(queries.transactions.list(budgetId));
};
