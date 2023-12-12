import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { useStore } from "../../store";

export const useTransactions = (accountId?: string) => {
  const budgetId = useStore((state) => state.budgetId);
  return useQuery({
    queryKey: ["transactions", { accountId }],
    queryFn: () => api.getTransactions({ budgetId, accountId: accountId! }),
    enabled: !!accountId,
  });
};
