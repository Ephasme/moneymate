import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { queries } from "./queries";

export const usePostTransactions = (props: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.postTransactions,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: queries.transactions._def });
      queryClient.invalidateQueries({ queryKey: queries.accounts._def });
      props.onSuccess();
    },
  });
};
