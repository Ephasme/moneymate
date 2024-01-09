import { TransactionView } from "@moneymate/shared";
import { Box, IconButton } from "@mui/material";
import classNames from "classnames";
import * as dateFns from "date-fns";
import { useState } from "react";
import { useTransactions } from "../../hooks/queries";
import { TrashIcon } from "../../icons/TrashIcon";
import { useStore } from "../../store";
import { AmountSpan, LeftPanel } from "../Common";
import { MainPanel } from "../Common/MainPanel";
import { MainLayout } from "../Layouts";
import { AddTransactionButton } from "./AddTransactionButton";

export const AssignEnvelope = () => {
  return (
    <Box className="text-[#ED4800] font-bold underline underline-offset-2">
      Assigner une enveloppe
    </Box>
  );
};

export const TransactionRow = ({
  transaction,
}: {
  transaction: TransactionView;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const props = (
    classNameList: string[] = [],
    options: { split?: boolean; isLastSplit?: boolean } = {
      split: false,
      isLastSplit: false,
    }
  ) => {
    const hasSplit = transaction.allocations.length > 1;

    return {
      className: classNames(
        "cursor-pointer",
        "flex items-center",
        "h-full",
        {
          "pb-5": options.split && options.isLastSplit,
          "pb-2": options.split && !options.isLastSplit,
          "py-3": !options.split,
          "bg-[#EAE8F2]": isHovered,
          "border-b border-[#D7D9DF]":
            (options.split && options.isLastSplit) ||
            (!options.split && !hasSplit),
        },
        classNameList
      ),
      onMouseEnter: () => {
        setIsHovered(true);
      },
      onMouseLeave: () => {
        setIsHovered(false);
      },
    };
  };

  return (
    <Box className="contents">
      <Box {...props(["pl-5"])}>{transaction.payee ?? "-"}</Box>
      <Box {...props(["text-[#6D6F7B]", "text-sm"])}>
        {dateFns.format(new Date(transaction.date), "dd MMM yy")} ·{" "}
        {transaction.accountName}
      </Box>
      <Box {...props(["text-sm"])}>
        {transaction.allocations.length > 1 ? (
          <Box className="italic">Dépense divisée</Box>
        ) : transaction.allocations.length === 1 ? (
          <Box>{transaction.allocations[0].envelopeName}</Box>
        ) : (
          <AssignEnvelope />
        )}
      </Box>
      <Box {...props(["font-bold"])}>
        <Box className="w-full text-right">
          <AmountSpan
            amount={transaction.amount}
            creditColor
            explicitPositive
          />
        </Box>
      </Box>
      <Box {...props(["h-[60px]"])}>
        {isHovered && (
          <IconButton size="small">
            <TrashIcon />
          </IconButton>
        )}
      </Box>
      {transaction.allocations.length > 1 &&
        transaction.allocations.map((allocation, index) => {
          const isLastSplit = index === transaction.allocations.length - 1;
          return (
            <>
              <Box
                {...props(["col-span-2"], { split: true, isLastSplit })}
              ></Box>
              <Box {...props(["text-sm"], { split: true, isLastSplit })}>
                {allocation.envelopeName}
              </Box>
              <Box
                {...props(["text-sm"], {
                  split: true,
                  isLastSplit,
                })}
              >
                <Box className="w-full text-right">
                  <AmountSpan
                    amount={allocation.amount}
                    creditColor
                    explicitPositive
                  />
                </Box>
              </Box>
              <Box {...props([], { split: true, isLastSplit })}></Box>
            </>
          );
        })}
    </Box>
  );
};

export const SpendingsPage = () => {
  const budgetId = useStore((state) => state.budgetId);
  const { data: transactions } = useTransactions(budgetId);
  if (!transactions) return <Box>Loading...</Box>;
  return (
    <MainLayout leftPanel={<LeftPanel mainButton={AddTransactionButton} />}>
      <MainPanel>
        <Box className="grid grid-cols-[auto_auto_auto_auto_40px] items-center px-8 py-5">
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </Box>
      </MainPanel>
    </MainLayout>
  );
};
