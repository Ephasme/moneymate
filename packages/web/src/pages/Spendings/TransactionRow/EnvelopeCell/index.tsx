import { Box } from "@mui/material";
import { EnvelopeName } from "../../../Common/EnvelopeName";
import { useTransactionRowContext } from "../TransactionRowContext";
import { MultiEnvelopeSelector } from "./MultiEnvelopeSelector";

export const EnvelopeCell = () => {
  const { transaction } = useTransactionRowContext();

  if (transaction.allocations.length === 0)
    return (
      <MultiEnvelopeSelector>
        <Box className="cell flex items-center p-2">
          <Box className="text-[#ED4800] font-bold underline whitespace-nowrap text-ellipsis overflow-hidden">
            Assigner une enveloppe
          </Box>
        </Box>
      </MultiEnvelopeSelector>
    );
  if (transaction.allocations.length === 1)
    return (
      <MultiEnvelopeSelector>
        <Box className="cell py-2 flex items-center px-2">
          <EnvelopeName id={transaction.allocations[0].envelopeId} />
        </Box>
      </MultiEnvelopeSelector>
    );
  else {
    return (
      <MultiEnvelopeSelector>
        <Box className="cell h-full flex items-center italic px-2">
          Dépense divisée
        </Box>
      </MultiEnvelopeSelector>
    );
  }
};
