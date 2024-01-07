import { Box } from "@mui/material";
import { useAccounts } from "../../hooks/queries";
import { LeftPanel } from "../Common";
import { MainPanel } from "../Common/MainPanel";
import { MainLayout } from "../Layouts";
import { AddAccountButton } from "./AddAccountButton";

export const AccountsPage = () => {
  const { data: accounts } = useAccounts();
  if (!accounts) return <Box>Loading...</Box>;

  return (
    <MainLayout leftPanel={<LeftPanel mainButton={AddAccountButton} />}>
      <MainPanel>
        {accounts.map((account) => (
          <Box key={account.id}>{account.name}</Box>
        ))}
      </MainPanel>
    </MainLayout>
  );
};
