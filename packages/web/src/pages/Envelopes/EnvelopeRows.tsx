import { Box } from "@mui/material";
import { useEnvelopes } from "../../hooks/queries";
import { EnvelopeRow, EnvelopeRowContext } from "./EnvelopeRow";

export const EnvelopeRows = ({}) => {
  const { data: envelopes } = useEnvelopes();
  if (!envelopes) return <Box>Loading envelopes...</Box>;

  return (
    <Box
      className="contents"
      sx={{
        ".row > div": {
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #BCC0CD",
          padding: "0.5rem",
        },
        ".row:hover > div": {
          backgroundColor: "#EAE8F2",
          cursor: "pointer",
        },
        ".row > div:first-child,div:last-child": {
          borderBottom: "none",
        },
        ".row:last-child > div": {
          borderBottom: "none",
        },
      }}
    >
      {envelopes.map((envelope) => (
        <EnvelopeRowContext.Provider
          value={{
            envelope,
          }}
        >
          <EnvelopeRow />
        </EnvelopeRowContext.Provider>
      ))}
    </Box>
  );
};
