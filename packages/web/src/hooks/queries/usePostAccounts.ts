import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { queries } from "./queries";

export const usePostAccounts = (props: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.postAccounts,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: queries.accounts._def });
      props.onSuccess();
    },
  });
};
