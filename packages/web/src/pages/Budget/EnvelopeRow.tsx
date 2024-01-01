import { Box } from "@mui/material";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useEnvelope } from "../../hooks/queries/useEnvelope";
import { CalendarIcon } from "../../icons/CalendarIcon";
import { ProgressBar } from "../Common/ProgressBar";
import { Checkbox } from "./Checkbox";
import { PriorityTag } from "./PriorityTag";
import { Tag } from "./Tag";

export const EnvelopeRow = ({ envelopeId }: { envelopeId: string }) => {
  const { data: envelope } = useEnvelope(envelopeId);
  if (!envelope) return <Box>Loading envelope...</Box>;
  return (
    <Box className="flex items-center px-20 pb-3 pt-4">
      <Box className="pr-3">
        <Checkbox />
      </Box>

      <Box
        className={
          "flex relative items-center justify-center " +
          "p-[0.66rem] rounded-lg bg-white border-[0.5px] " +
          "border-[#D7D9DF] h-12 w-12 mr-5"
        }
        sx={{
          boxShadow:
            "0px 0px 8px 0px rgba(0, 0, 0, 0.08), 0px 0.5px 0px 0px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[2rem]">
          🧥
        </Box>
      </Box>

      <Box className="flex flex-grow h-full flex-col justify-between py-1 mr-8">
        <Box className="flex gap-3">
          <Box className="font-bold leading-5">{envelope.name}</Box>
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
      <Box className="font-black mr-8">{formatCurrency(23445n)}</Box>
      <Box>{formatCurrency(23445n)} restant</Box>
    </Box>
  );
};
