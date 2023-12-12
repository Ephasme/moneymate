import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";

export const useSaveTransfer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.saveTransfer,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["envelopes"] });
    },
    onError(err) {
      console.error(err);
    },
  });
};
