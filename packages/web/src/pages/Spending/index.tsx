import { LeftPanel } from "../Common";
import { MainLayout } from "../Layouts";
import { AddTransactionButton } from "./AddTransactionButton";

export const SpendingPage = () => {
  return (
    <MainLayout leftPanel={<LeftPanel mainButton={AddTransactionButton} />}>
      coucou
    </MainLayout>
  );
};
