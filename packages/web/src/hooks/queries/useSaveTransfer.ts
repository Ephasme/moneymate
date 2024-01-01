import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { queries } from "./queries";

export const useSaveTransfer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.saveTransfer,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: queries.envelopes._def });
    },
    onError(err) {
      console.error(err);
    },
  });
};
