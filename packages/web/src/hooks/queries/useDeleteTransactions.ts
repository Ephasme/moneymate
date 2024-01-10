import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { queries } from "./queries";

export const useDeleteTransactions = ({
  onSuccess = () => {},
  onError = () => {},
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (list: string[]) => {
      await api.deleteTransactions(list.map((id) => ({ id })));
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
