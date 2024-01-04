import { EnvelopeView, MAIN_ENVELOPE_ID } from "@moneymate/shared";
import { Box } from "@mui/material";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useEnvelope, useEnvelopes } from "../../hooks/queries";

export const BalanceField = ({ envelope }: { envelope: EnvelopeView }) => {
  const { data: envelopes } = useEnvelopes();
  const { data: defaultEnvelope } = useEnvelope(MAIN_ENVELOPE_ID);

  if (!envelopes) return <Box>Loading envelopes...</Box>;
  if (!defaultEnvelope) return <Box>Loading default envelope...</Box>;

  return (
    <Box
      className={`${envelope.balance < 0 ? "text-[#FF1D36] font-bold" : ""}`}
    >
      {formatCurrency(envelope.balance)}
    </Box>
  );
};
