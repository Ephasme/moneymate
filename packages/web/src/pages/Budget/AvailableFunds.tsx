import { MAIN_ENVELOPE_ID } from "@moneymate/shared";
import { Box, ButtonBase } from "@mui/material";
import { AssignPopup } from "./AssignPopup";
import { useEnvelope } from "../Common/useEnvelope";
import { formatCurrency } from "../../helpers/formatCurrency";

export const AvailableFunds = () => {
  const envelope = useEnvelope(MAIN_ENVELOPE_ID);

  if (!envelope) return <Box>Loading...</Box>;
  let colors: {
    bg: string;
    button: string;
  };
  if (envelope.balance > 0n) {
    colors = {
      bg: "#C1EE9F",
      button: "#4D9019",
    };
  } else if (envelope.balance < 0n) {
    colors = {
      bg: "#FAACA5",
      button: "#C72C1D",
    };
  } else {
    colors = {
      bg: "#EDF1F5",
      button: "#6D7A88",
    };
  }
  return (
    <Box className="flex flex-col justify-center items-center flex-grow">
      <Box
        className={`flex items-center border bg-[${colors.bg}] rounded-md border-solid p-2 pl-5 pr-5`}
      >
        <Box className="flex flex-col flex-grow">
          <Box className="text-[1.5rem] font-bold font-number">
            {formatCurrency(envelope.balance)}
          </Box>
          {envelope.balance > 0n && <Box className="text-sm">Available</Box>}
          {envelope.balance < 0n && <Box className="text-sm">In debt</Box>}
          {envelope.balance === 0n && (
            <Box className="text-sm">Fully assigned</Box>
          )}
        </Box>

        {envelope.balance > 0n && (
          <Box
            className={`ml-8 text-white rounded-md`}
            sx={{ backgroundColor: colors.button }}
          >
            <AssignPopup envelopeId={envelope.id}>
              {() => (
                <ButtonBase>
                  <Box className={`pt-1 pb-1 pl-4 pr-4 `}>Assign</Box>
                </ButtonBase>
              )}
            </AssignPopup>
          </Box>
        )}
      </Box>
    </Box>
  );
};
