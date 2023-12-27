import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { queries } from "./queries";

export const useSaveEnvelope = (props: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.saveEnvelope,
    onError(error) {
      console.error(error);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: queries.envelopes._def });
      queryClient.invalidateQueries({ queryKey: queries.envelopeGroups._def });
      props.onClose();
    },
  });
};
