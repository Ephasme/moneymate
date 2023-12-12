import { Box, Checkbox } from "@mui/material";
import * as dateFns from "date-fns";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useTransaction } from "../Common/useTransaction";
import { TransactionStatusButton } from "./TransactionStatusButton";
import { useAccountsStore } from "./store";

export const TransactionReadonlyRow = ({
  transactionId,
  onEdit,
}: {
  transactionId: string;
  onEdit: () => void;
}) => {
  const selectTransaction = useAccountsStore(
    (state) => state.selectTransaction
  );
  const removeTransaction = useAccountsStore(
    (state) => state.removeTransaction
  );
  const selectedTransactions = useAccountsStore(
    (state) => state.selectedTransactions
  );

  const { data: transaction } = useTransaction(transactionId);

  if (!transaction) return null;

  return (
    <Box className="contents">
      <Box className="flex items-center border-b border-solid border-slate-300 justify-center">
        <Checkbox
          checked={selectedTransactions.includes(transaction.id)}
          onChange={(_, checked) => {
            if (checked) {
              selectTransaction(transaction.id);
            } else {
              removeTransaction(transaction.id);
            }
          }}
          size="small"
        />
      </Box>
      <Box
        className="flex items-center border-b border-solid border-slate-300 pl-[calc(8px_+_14px)]"
        onClick={() => {
          onEdit();
        }}
      >
        <Box>
          {transaction
            ? dateFns.format(new Date(transaction.date), "dd/MM/yyyy")
            : ""}
        </Box>
      </Box>
      <Box
        className="flex items-center border-b border-solid border-slate-300 pl-[calc(8px_+_6px)]"
        sx={{}}
        onClick={() => {
          onEdit();
        }}
      >
        <Box>{transaction.accountName}</Box>
      </Box>
      <Box
        className="flex items-center border-b border-solid border-slate-300 pl-[calc(8px_+_6px)]"
        onClick={() => {
          onEdit();
        }}
      >
        <Box>
          {transaction.allocations.length === 1
            ? transaction?.allocations[0].envelopeName
            : ""}
        </Box>
      </Box>
      <Box
        className="flex items-center border-b border-solid border-slate-300 pl-[calc(8px_+_6px)]"
        onClick={() => {
          onEdit();
        }}
      >
        <Box>{transaction.description}</Box>
      </Box>
      <Box
        className="flex items-center border-b border-solid border-slate-300 justify-end pr-[calc(8px_+_14px)]"
        onClick={() => {
          onEdit();
        }}
      >
        <Box>
          {transaction.amount < 0
            ? formatCurrency(-1n * transaction.amount)
            : null}
        </Box>
      </Box>
      <Box
        className="flex items-center border-b border-solid border-slate-300 justify-end pr-[calc(8px_+_14px)]"
        onClick={() => {
          onEdit();
        }}
      >
        <Box>
          {transaction.amount >= 0 ? formatCurrency(transaction.amount) : null}
        </Box>
      </Box>

      <Box className="flex items-center border-b border-solid border-slate-300 justify-center">
        <TransactionStatusButton transactionId={transaction.id} />
      </Box>
    </Box>
  );
};
