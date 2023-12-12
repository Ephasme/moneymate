import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";

export const useSaveAccount = (props: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.saveAccount,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      props.onClose();
    },
  });
};
