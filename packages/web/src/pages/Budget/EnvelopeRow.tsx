import { Box } from "@mui/material";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useEnvelope } from "../../hooks/queries/useEnvelope";
import { CalendarIcon } from "../../icons/CalendarIcon";
import { ProgressBar } from "./ProgressBar";
import { Checkbox } from "./Checkbox";
import { PriorityTag } from "./PriorityTag";
import { Tag } from "./Tag";
import { EnvelopeName } from "./EnvelopeName";
import { AllocationField } from "./AllocationField";

export const EnvelopeRow = ({ envelopeId }: { envelopeId: string }) => {
  const { data: envelope } = useEnvelope(envelopeId);
  if (!envelope) return <Box>Loading envelope...</Box>;
  return (
    <>
      <Box className="pr-4">
        <Checkbox />
      </Box>

      <Box
        className={
          "flex relative items-center justify-center " +
          "p-[0.5rem] rounded-lg bg-white border-[0.5px] " +
          "border-[#D7D9DF] h-12 w-12 pr-8"
        }
        sx={{
          boxShadow:
            "0px 0px 8px 0px rgba(0, 0, 0, 0.08), 0px 0.5px 0px 0px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[2rem]">
          {envelope.emoji}
        </Box>
      </Box>

      <Box className="flex flex-grow h-full flex-col justify-between py-1 mr-8">
        <Box className="flex gap-3">
          <EnvelopeName envelope={envelope} />
          <Box className="flex gap-1">
            <PriorityTag level={1} />
            <Tag text="dépenses" />
            <Tag
              text="le 2 du mois"
              startIcon={
                <Box className="w-[0.93rem]">
                  <CalendarIcon />
                </Box>
              }
            />
          </Box>
        </Box>
        <ProgressBar />
      </Box>
      <AllocationField envelope={envelope} />
      <Box>{formatCurrency(envelope.balance)} restant</Box>
    </>
  );
};
