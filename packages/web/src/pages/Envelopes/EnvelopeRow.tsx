import { EnvelopeView } from "@moneymate/shared";
import { Box } from "@mui/material";
import { createContext, useContext } from "react";
import { AmountSpan } from "../Common";
import { Checkbox } from "../Common/Checkbox";
import { EnvelopeName } from "../Common/EnvelopeName";
import { ProgressBar } from "./ProgressBar";

export const EnvelopeRowContext = createContext<{
  envelope: EnvelopeView;
}>(null!);

export const useEnvelopeRowContext = () => {
  return useContext(EnvelopeRowContext);
};

export const EnvelopeRow = () => {
  const { envelope } = useEnvelopeRowContext();

  return (
    <Box key={envelope.id} className="contents row">
      <Box></Box>
      <Box>
        <Checkbox />
      </Box>
      <Box>
        <EnvelopeName id={envelope.id} />
      </Box>
      <Box>
        <ProgressBar />
      </Box>
      <Box></Box>
      <Box className="flex justify-end font-bold">
        <AmountSpan amount={envelope.allocated} />
      </Box>
      <Box className="flex justify-end">
        <AmountSpan amount={envelope.balance} />
      </Box>
      <Box></Box>
    </Box>
  );
};
