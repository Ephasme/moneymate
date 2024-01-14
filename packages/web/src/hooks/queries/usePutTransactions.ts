import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { queries } from "./queries";

export const usePutTransactions = ({
  onSuccess = () => {},
}: {
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.putTransactions,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: queries.transactions._def });
      queryClient.invalidateQueries({ queryKey: queries.accounts._def });
      queryClient.invalidateQueries({ queryKey: queries.payees._def });
      queryClient.invalidateQueries({ queryKey: queries.envelopes._def });
      onSuccess();
    },
  });
};
