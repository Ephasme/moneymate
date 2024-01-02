import { Box } from "@mui/material";
import { formatCurrency } from "../../helpers/formatCurrency";
import { EnvelopeView } from "@moneymate/shared";

export const BalanceField = ({ envelope }: { envelope: EnvelopeView }) => {
  if (envelope.balance < 0) {
    return (
      <Box className="text-[#FF1D36] font-bold">
        {formatCurrency(envelope.balance)}
      </Box>
    );
  }
  return <Box>{formatCurrency(envelope.balance)}</Box>;
};
