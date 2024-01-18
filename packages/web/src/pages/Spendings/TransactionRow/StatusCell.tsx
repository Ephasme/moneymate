import { Box, IconButton } from "@mui/material";
import { useTransactionRowContext } from "./TransactionRowContext";
import { usePatchTransactions } from "../../../hooks/queries";

export const StatusCell = () => {
  const { transaction } = useTransactionRowContext();
  const { mutate: patchTransaction } = usePatchTransactions();
  return (
    <Box className="cell flex items-center">
      {transaction.status === "pending" && (
        <IconButton
          onClick={() => {
            patchTransaction([
              {
                id: transaction.id,
                status: "cleared",
              },
            ]);
          }}
          size="small"
        >
          <span className="material-symbols-outlined text-[#ED4800]">
            sync_disabled
          </span>
        </IconButton>
      )}
      {transaction.status === "cleared" && (
        <IconButton
          onClick={() => {
            patchTransaction([
              {
                id: transaction.id,
                status: "pending",
              },
            ]);
          }}
          size="small"
        >
          <span className="material-symbols-outlined text-[#37B692]">sync</span>
        </IconButton>
      )}
    </Box>
  );
};
