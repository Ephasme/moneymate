import { MAIN_ENVELOPE_ID } from "@moneymate/shared";
import { Box, Skeleton } from "@mui/material";
import { useEnvelope } from "../../hooks/queries";
import { AmountSpan } from "./AmountSpan";

export const ReadyToAssign = () => {
  const { data: mainEnvelope } = useEnvelope(MAIN_ENVELOPE_ID);

  return (
    <Box className="flex flex-col ml-8 text-3xl w-40 leading-8 font-medium">
      {mainEnvelope ? (
        <span>
          <AmountSpan amount={mainEnvelope.balance} />
          <br /> à assigner
        </span>
      ) : (
        <Skeleton variant="rectangular" height={64} sx={{ m: 0, p: 0 }} />
      )}
    </Box>
  );
};
