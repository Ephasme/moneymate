import { Box } from "@mui/material";
import { useEnvelope } from "../../hooks/queries/useEnvelope";
import { useStore } from "../../store";
import { AllocationField } from "./AllocationField";
import { BalanceField } from "./BalanceField";
import { Checkbox } from "./Checkbox";
import { EnvelopeName } from "./EnvelopeName";
import { PriorityTag } from "./PriorityTag";
import { ProgressBar } from "./ProgressBar";

export const EnvelopeRow = ({ envelopeId }: { envelopeId: string }) => {
  const { data: envelope } = useEnvelope(envelopeId);
  const selectedEnvelopes = useStore((state) => state.selectedEnvelopes);
  const setSelectedEnvelopes = useStore((state) => state.setSelectedEnvelopes);
  if (!envelope) return <Box>Loading envelope...</Box>;

  const isSelected = selectedEnvelopes.includes(envelope.id);

  return (
    <>
      <Box className={`h-full ${isSelected ? "bg-[#EAE8F2]" : ""}`}></Box>
      <Box
        className={`flex items-center justify-center py-5 ${
          isSelected ? "bg-[#EAE8F2]" : ""
        }`}
      >
        <Checkbox
          checked={isSelected}
          onChange={(_, checked) => {
            setSelectedEnvelopes([{ envelopeId: envelope.id, checked }]);
          }}
        />
      </Box>
      <Box
        className={`flex items-center justify-center h-full px-4 ${
          isSelected ? "bg-[#EAE8F2]" : ""
        }`}
      >
        <Box
          className={
            "relative rounded-lg bg-white border-[0.5px] " +
            "border-[#D7D9DF] h-12 w-12"
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
      </Box>
      <Box
        className={`flex flex-grow h-full flex-col justify-around py-3 px-3  ${
          isSelected ? "bg-[#EAE8F2]" : ""
        }`}
      >
        <Box className="flex min-w-full justify-between gap-3">
          <EnvelopeName envelope={envelope} />
          <PriorityTag level={1} />
        </Box>
        <ProgressBar />
      </Box>
      <Box
        className={`flex items-center justify-end h-full ${
          isSelected ? "bg-[#EAE8F2]" : ""
        }`}
      >
        <AllocationField envelope={envelope} />
      </Box>
      <Box
        className={`flex items-center justify-end h-full ${
          isSelected ? "bg-[#EAE8F2]" : ""
        }`}
      >
        <BalanceField envelope={envelope} />
      </Box>
      <Box className={`h-full ${isSelected ? "bg-[#EAE8F2]" : ""}`}></Box>
    </>
  );
};
