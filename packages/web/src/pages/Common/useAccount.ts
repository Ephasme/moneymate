import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";

export const useAccount = (accountId?: string) => {
  return useQuery({
    queryKey: ["accounts", { accountId }],
    queryFn: () => api.getAccount({ accountId: accountId! }),
    enabled: !!accountId,
  });
};
