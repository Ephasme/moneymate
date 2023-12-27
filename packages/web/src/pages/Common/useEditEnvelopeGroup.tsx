import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { queries } from "./queries";

export const useEditEnvelopeGroup = ({
  onSuccess = () => {},
  onError = () => {},
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.editEnvelopeGroup,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: queries.envelopes._def });
      queryClient.invalidateQueries({ queryKey: queries.envelopeGroups._def });
    },
    onError: (error) => {
      onError(error);
      console.error(error);
    },
  });
};
