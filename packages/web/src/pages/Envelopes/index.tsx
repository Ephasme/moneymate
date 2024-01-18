import { Box } from "@mui/material";
import { LeftPanel } from "../Common";
import { MainPanel } from "../Common/MainPanel";
import { MainLayout } from "../Layouts";
import { EnvelopeRows } from "./EnvelopeRows";
import { EnvelopeHeaders } from "./EnvelopeHeaders";

export const EnvelopesPage = () => {
  return (
    <MainLayout leftPanel={<LeftPanel />}>
      <MainPanel>
        <Box
          className="grid py-8"
          gridTemplateColumns="minmax(2rem, 5rem) calc(40px + 0.5rem) 2fr 1.5fr 100px 1fr 1fr minmax(2rem, 5rem)"
        >
          <EnvelopeHeaders />
          <EnvelopeRows />
        </Box>
      </MainPanel>
    </MainLayout>
  );
};
