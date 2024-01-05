import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { queries } from "./queries";

export const usePatchEnvelopes = ({
  onSuccess = () => {},
  onError = () => {},
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.patchEnvelopes,
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
