import { Box } from "@mui/material";
import { useTransactions } from "../../hooks/queries";
import { useStore } from "../../store";
import { LeftPanel, TopBar } from "../Common";
import { MainPanel } from "../Common/MainPanel";
import { MainLayout } from "../Layouts";
import { AddTransactionButton } from "./AddTransactionButton";
import { TransactionRow } from "./TransactionRow";
import { TransactionHeaders } from "./TransactionRow/TransactionHeaders";
import "./index.less";
import _ from "lodash";

export const SpendingsPage = () => {
  const budgetId = useStore((state) => state.budgetId);
  const { data: transactions } = useTransactions(budgetId);
  if (!transactions) return <Box>Loading...</Box>;
  return (
    <MainLayout
      topBar={
        <TopBar
          leftPart={
            <Box className="flex items-center justify-start font-medium text-2xl mr-6">
              fdjskl
            </Box>
          }
        />
      }
      leftPanel={<LeftPanel mainButton={AddTransactionButton} />}
    >
      <MainPanel>
        <Box
          className="grid p-8"
          sx={{
            gridTemplateColumns:
              "40px minmax(0, 1fr) 120px minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) 40px",
          }}
        >
          <TransactionHeaders />
          {_(transactions)
            .sortBy((transaction) => transaction.date)
            .reverse()
            .map((transaction) => {
              return (
                <TransactionRow key={transaction.id} id={transaction.id} />
              );
            })
            .value()}
        </Box>
      </MainPanel>
    </MainLayout>
  );
};
