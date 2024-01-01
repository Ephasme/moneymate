import { useQuery } from "@tanstack/react-query";
import { queries } from "./queries";

export const useTransactions = (accountId?: string) => {
  return useQuery({
    ...queries.transactions.list({ accountId: accountId! }),
    enabled: !!accountId,
  });
};
