import { Box } from "@mui/material";
import { useEnvelopes } from "../../hooks/queries/useEnvelopes";
import { MainLayout } from "../Layouts";
import { Checkbox } from "./Checkbox";
import { EnvelopeRow } from "./EnvelopeRow";

export const Budget = () => {
  const { data: envelopes } = useEnvelopes();
  if (!envelopes) return <Box>Loading envelopes...</Box>;

  const filteredEnvelopes = envelopes.filter((envelope) => {
    return !envelope.isDefault && !envelope.isHidden;
  });

  return (
    <MainLayout>
      <Box
        className="flex flex-col flex-grow bg-slate-100 mr-4 mb-4 rounded-[2rem]"
        sx={{
          background: "linear-gradient(113deg, #F3E9EA 0%, #F2F4F8 100%);",
        }}
      >
        <Box className="flex items-center border-b-[0.5px] border-b-[#999EAD] px-20 pb-3 pt-4">
          <Box className="pr-3">
            <Checkbox />
          </Box>
          <Box> Enveloppes de dépenses</Box>
        </Box>

        {filteredEnvelopes.map((envelope) => (
          <EnvelopeRow envelopeId={envelope.id} />
        ))}
      </Box>
    </MainLayout>
  );
};
