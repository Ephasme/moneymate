import { TransactionPatchedInput } from "@moneymate/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { queries } from "./queries";

export const usePatchTransactions = ({
  onSuccess = () => {},
  onError = () => {},
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (list: TransactionPatchedInput[]) => {
      await api.patchTransactions(list);
    },
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: queries.transactions._def });
      queryClient.invalidateQueries({ queryKey: queries.accounts._def });
    },
    onError: (error) => {
      onError(error);
      console.error(error);
    },
  });
};
