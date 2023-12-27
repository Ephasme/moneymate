import { useQuery } from "@tanstack/react-query";
import { queries } from "./queries";

export const useTransaction = (transactionId?: string) => {
  return useQuery({
    ...queries.transactions.details(transactionId!),
    enabled: !!transactionId,
  });
};
