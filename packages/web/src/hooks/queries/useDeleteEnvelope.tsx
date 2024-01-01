import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { queries } from "./queries";

export const useDeleteEnvelope = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteEnvelope,
    onSuccess: () => {
      // setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: queries.envelopes._def });
      queryClient.invalidateQueries({ queryKey: queries.envelopeGroups._def });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
