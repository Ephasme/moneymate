import { MainLayout } from "../Layouts";
import { EnvelopeList } from "./EnvelopeList";
import { RightPanel } from "./RightPanel";

export const Budget = () => {
  return (
    <MainLayout rightPanel={<RightPanel />}>
      <EnvelopeList />
    </MainLayout>
  );
};
