import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";

export const useTransaction = (transactionId?: string) => {
  return useQuery({
    queryKey: ["transactions", { transactionId }],
    queryFn: () => api.getTransaction({ transactionId: transactionId! }),
    enabled: !!transactionId,
  });
};
