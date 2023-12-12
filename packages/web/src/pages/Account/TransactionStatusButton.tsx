import { IconButton } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { matchStatus } from "@moneymate/shared";
import ClearedIcon from "@mui/icons-material/Copyright";
import { useTransaction } from "../Common/useTransaction";

export const TransactionStatusButton = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const queryClient = useQueryClient();
  const { data: transaction } = useTransaction(transactionId);
  const { mutate: saveStatus } = useMutation({
    mutationFn: api.saveTransactionStatus,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["transactions", { transactionId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });

  if (!transaction) return null;

  return matchStatus(transaction.status, {
    onPending: () => (
      <IconButton
        size="small"
        onClick={() => {
          saveStatus({ id: transaction.id, status: "cleared" });
        }}
      >
        <ClearedIcon fontSize="small" color="disabled" />
      </IconButton>
    ),
    onCleared: () => (
      <IconButton
        size="small"
        onClick={() => {
          saveStatus({ id: transaction.id, status: "pending" });
        }}
      >
        <ClearedIcon fontSize="small" color="primary" />
      </IconButton>
    ),
  });
};
