import { Box } from "@mui/joy";
import { useEnvelopes } from "../../hooks/queries/useEnvelopes";
import { MainLayout } from "../Layouts";
import { Checkbox } from "./Checkbox";
import { EnvelopeRow } from "./EnvelopeRow";
import { useStore } from "../../store";
import { LeftPanel } from "../Common";
import { AddEnvelopeButton } from "./AddEnvelopeButton";
import { RightPanel } from "./RightPanel";
import { MainPanel } from "../Common/MainPanel";

export const Envelopes = () => {
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
    <MainLayout
      leftPanel={<LeftPanel mainButton={AddEnvelopeButton} />}
      rightPanel={<RightPanel />}
    >
      <MainPanel>
        <Box className="grid w-full items-center grid-cols-envelopes">
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
          <Box className="border-b-[0.5px] border-b-[#999EAD] text-right pr-[calc(1.25rem_+_34px)] h-full flex justify-end items-center">
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
      </MainPanel>
    </MainLayout>
  );
};
