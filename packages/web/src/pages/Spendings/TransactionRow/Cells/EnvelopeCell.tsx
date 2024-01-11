import { Box } from "@mui/material";
import { AssignEnvelope } from "../AssignEnvelope";
import { useTransactionContext } from "../useTransactionContext";

export const EnvelopeCell = () => {
  const { transaction, setIsHovered } = useTransactionContext();
  return (
    <AssignEnvelope
      trigger={({ onClick }) => {
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
