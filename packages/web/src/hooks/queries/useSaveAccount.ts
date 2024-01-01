import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { queries } from "./queries";

export const useSaveAccount = (props: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.saveAccount,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: queries.accounts._def });
      props.onClose();
    },
  });
};
