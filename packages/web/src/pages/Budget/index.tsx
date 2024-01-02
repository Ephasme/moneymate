import { Box } from "@mui/material";
import { useEnvelopes } from "../../hooks/queries/useEnvelopes";
import { MainLayout } from "../Layouts";
import { Checkbox } from "./Checkbox";
import { EnvelopeRow } from "./EnvelopeRow";
import { useStore } from "../../store";

export const Budget = () => {
  const { data: envelopes } = useEnvelopes();
  const selectedEnvelopes = useStore((state) => state.selectedEnvelopes);
  const setSelectedEnvelopes = useStore((state) => state.setSelectedEnvelopes);

  if (!envelopes) return <Box>Loading envelopes...</Box>;

  const filteredEnvelopes = envelopes.filter((envelope) => {
    return !envelope.isDefault && !envelope.isHidden;
  });
  const allEnvelopesSelected = filteredEnvelopes.every((envelope) => {
    return selectedEnvelopes.includes(envelope.id);
  });
  const someEnvelopesSelected = filteredEnvelopes.some((envelope) => {
    return selectedEnvelopes.includes(envelope.id);
  });

  return (
    <MainLayout>
      <Box
        className="flex flex-col flex-grow bg-slate-100 mr-4 mb-4 rounded-[2rem] overflow-y-scroll"
        sx={{
          background: "linear-gradient(113deg, #F3E9EA 0%, #F2F4F8 100%);",
        }}
      >
        <Box
          className="grid w-full items-center"
          sx={{
            gridTemplateColumns:
              // "5rem calc(34px + 2rem) calc(48px + 2rem) 1fr 1fr 1fr 5rem",
              "1fr 1fr 1fr 1fr minmax(10rem, 1fr) 2fr 2fr",
          }}
        >
          <Box className="border-b-[0.5px] border-b-[#999EAD] h-full min-h-[5rem]"></Box>
          <Box className="border-b-[0.5px] border-b-[#999EAD] h-full flex justify-center items-center">
            <Checkbox
              checked={allEnvelopesSelected}
              indeterminate={someEnvelopesSelected}
              onChange={() => {
                const createList = (value: boolean) =>
                  filteredEnvelopes.map((envelope) => ({
                    envelopeId: envelope.id,
                    checked: value,
                  }));
                if (someEnvelopesSelected) {
                  setSelectedEnvelopes(createList(false));
                } else {
                  setSelectedEnvelopes(createList(true));
                }
              }}
            />
          </Box>
          <Box className="border-b-[0.5px] border-b-[#999EAD] col-span-2 px-4 h-full flex justify-start items-center">
            Enveloppes de dépenses
          </Box>
          <Box className="border-b-[0.5px] border-b-[#999EAD] text-right pr-4 h-full flex justify-end items-center">
            Assigné
          </Box>
          <Box className="border-b-[0.5px] border-b-[#999EAD] text-right h-full flex justify-end items-center">
            Disponible
          </Box>
          <Box className="border-b-[0.5px] border-b-[#999EAD] text-right h-full"></Box>
          {filteredEnvelopes.map((envelope) => (
            <EnvelopeRow key={envelope.id} envelopeId={envelope.id} />
          ))}
        </Box>
      </Box>
    </MainLayout>
  );
};
