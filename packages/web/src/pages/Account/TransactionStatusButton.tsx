import { matchStatus } from "@moneymate/shared";
import ClearedIcon from "@mui/icons-material/Copyright";
import LockedIcon from "@mui/icons-material/Lock";
import { IconButton } from "@mui/material";
import { usePatchTransactions } from "../Common/usePatchTransactions";
import { useTransaction } from "../Common/useTransaction";

export const TransactionStatusButton = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const { data: transaction } = useTransaction(transactionId);
  const { mutate: patchTransactions } = usePatchTransactions();

  if (!transaction) return null;

  return matchStatus(transaction.status, {
    onReconciled: () => (
      <IconButton
        size="small"
        onClick={() => {
          patchTransactions([{ id: transaction.id, status: "pending" }]);
        }}
      >
        <LockedIcon fontSize="small" />
      </IconButton>
    ),
    onPending: () => (
      <IconButton
        size="small"
        onClick={() => {
          patchTransactions([{ id: transaction.id, status: "cleared" }]);
        }}
      >
        <ClearedIcon fontSize="small" color="disabled" />
      </IconButton>
    ),
    onCleared: () => (
      <IconButton
        size="small"
        onClick={() => {
          patchTransactions([{ id: transaction.id, status: "pending" }]);
        }}
      >
        <ClearedIcon fontSize="small" color="primary" />
      </IconButton>
    ),
  });
};
