import { Box } from "@mui/material";
import { useBudgetViewStore } from "./store";
import { useMainLayoutStore } from "../Layouts";

const SingleEnvelopeRightPanel = ({ envelopeId }: { envelopeId: string }) => {
  return (
    <Box>
      <h1>Single Envelope</h1>
      <p>{envelopeId}</p>
      <Box>Create goal:</Box>

      <Box></Box>
    </Box>
  );
};

export const RightPanel = () => {
  const selectedEnvelopes = useBudgetViewStore(
    (state) => state.selectedEnvelopes
  );
  const setRightPanelSize = useMainLayoutStore(
    (state) => state.setRightPanelSize
  );

  if (selectedEnvelopes.length === 0) {
    setRightPanelSize(0);
    return null;
  }

  if (selectedEnvelopes.length === 1) {
    setRightPanelSize("30%");
    return <SingleEnvelopeRightPanel envelopeId={selectedEnvelopes[0]} />;
  }
};
