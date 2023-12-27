import { useQuery } from "@tanstack/react-query";
import { queries } from "./queries";

export const useAccount = (accountId?: string) => {
  return useQuery({
    ...queries.accounts.details(accountId!),
    enabled: !!accountId,
  });
};
