import { Box } from "@mui/joy";
import { useTransactions } from "../../hooks/queries";
import { useStore } from "../../store";
import { LeftPanel } from "../Common";
import { MainPanel } from "../Common/MainPanel";
import { MainLayout } from "../Layouts";
import { AddTransactionButton } from "./AddTransactionButton";
import { TransactionRow } from "./TransactionRow";

export const SpendingsPage = () => {
  const budgetId = useStore((state) => state.budgetId);
  const { data: transactions } = useTransactions(budgetId);
  if (!transactions) return <Box>Loading...</Box>;
  return (
    <MainLayout leftPanel={<LeftPanel mainButton={AddTransactionButton} />}>
      <MainPanel>
        <Box className="grid grid-cols-[auto_auto_auto_auto_auto_40px] items-center px-8 py-5">
          {transactions.map((transaction, index) => {
            const isLast = index === transactions.length - 1;
            return (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                isLastTransaction={isLast}
              />
            );
          })}
        </Box>
      </MainPanel>
    </MainLayout>
  );
};
