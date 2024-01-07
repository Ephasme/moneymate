import { Box } from "@mui/material";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useTransactions } from "../../hooks/queries";
import { LeftPanel } from "../Common";
import { MainPanel } from "../Common/MainPanel";
import { MainLayout } from "../Layouts";
import { AddTransactionButton } from "./AddTransactionButton";
import { useStore } from "../../store";

export const SpendingsPage = () => {
  const budgetId = useStore((state) => state.budgetId);
  const { data: transactions } = useTransactions(budgetId);
  if (!transactions) return <Box>Loading...</Box>;
  return (
    <MainLayout leftPanel={<LeftPanel mainButton={AddTransactionButton} />}>
      <MainPanel>
        {transactions.map((transaction) => (
          <div key={transaction.id}>{formatCurrency(transaction.amount)}</div>
        ))}
      </MainPanel>
    </MainLayout>
  );
};
