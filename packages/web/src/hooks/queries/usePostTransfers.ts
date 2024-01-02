import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { queries } from "./queries";

export const usePostTransfers = ({
  onSuccess = () => {},
  onError = () => {},
}: {
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.postTransfers,
    onSuccess() {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: queries.envelopes._def });
    },
    onError(err) {
      onError(err);
      console.error(err);
    },
  });
};
