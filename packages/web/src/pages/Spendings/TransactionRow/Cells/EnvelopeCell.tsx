import { Box } from "@mui/material";
import { AssignEnvelope } from "../AssignEnvelope";
import { useTransactionContext } from "../useTransactionContext";
import { bim } from "@moneymate/shared";
import WarningIcon from "@mui/icons-material/WarningAmber";

export const EnvelopeCell = () => {
  const { transaction, setIsHovered } = useTransactionContext();
  const isPartiallyAllocated =
    bim.sumBy(transaction.allocations, (x) => x.amount) !== transaction.amount;
  return (
    <AssignEnvelope
      trigger={({ onClick }) => {
        if (isPartiallyAllocated) {
          return (
            <Box className="flex rounded-full text-sm border bg-orange-200 border-orange-100 px-3 my-2 py-1">
              <WarningIcon fontSize="small" />
              <Box className="pl-1">Transaction partiellement allouée</Box>
            </Box>
          );
        }
        return transaction.allocations.length === 1 ? (
          <Box onClick={onClick}>{transaction.allocations[0].envelopeName}</Box>
        ) : transaction.allocations.length > 1 ? (
          <Box onClick={onClick} className="italic">
            Dépense divisée
          </Box>
        ) : (
          <Box
            onClick={onClick}
            className="text-[#ED4800] font-bold underline underline-offset-2"
          >
            Assigner une enveloppe
          </Box>
        );
      }}
      onOpenChange={(value) => {
        if (!value) {
          setIsHovered(false);
        }
      }}
      transaction={transaction}
    />
  );
};
