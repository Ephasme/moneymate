import { TransactionView } from "@moneymate/shared";
import { Box, IconButton } from "@mui/material";
import classNames from "classnames";
import { useState } from "react";
import { useDeleteTransactions } from "../../../hooks/queries";
import { TrashIcon } from "../../../icons/TrashIcon";
import { DateCell } from "./Cells/DateCell";
import { EnvelopeCell } from "./Cells/EnvelopeCell";
import { PayeeCell } from "./Cells/PayeeCell";
import { TransactionSplits } from "./TransactionSplits";
import { TransactionContext } from "./useTransactionContext";
import { AccountCell } from "./Cells/AccountCell";
import { AmountCell } from "./Cells/AmountCell";

export const TransactionRow = ({
  transaction,
  isLastTransaction,
}: {
  transaction: TransactionView;
  isLastTransaction: boolean;
}) => {
  const { mutate: deleteTransactions } = useDeleteTransactions();
  const [isTransactionHovered, setIsTransactionHovered] = useState(false);
  const commonProps = (className: string = "") => ({
    className: classNames(
      ["cursor-pointer", "flex", "items-center", "py-2", "h-full"],
      {
        "border-b border-[#D7D9DF]":
          !isLastTransaction && transaction.allocations.length <= 1,
        "bg-[#EAE8F2]": isTransactionHovered,
        "pb-2": transaction.allocations.length > 1,
      }
    ).concat(` ${className}`),
    onMouseEnter: () => setIsTransactionHovered(true),
    onMouseLeave: () => setIsTransactionHovered(false),
  });
  return (
    <TransactionContext.Provider value={transaction}>
      <Box className="contents">
        <Box {...commonProps("pl-3")}>
          <PayeeCell />
        </Box>
        <Box {...commonProps()}>
          <DateCell />
        </Box>
        <Box {...commonProps()}>
          <AccountCell />
        </Box>
        <Box {...commonProps()}>
          <EnvelopeCell />
        </Box>
        <Box {...commonProps()}>
          <AmountCell />
        </Box>
        <Box {...commonProps("flex justify-center")}>
          {isTransactionHovered ? (
            <IconButton
              onClick={() => {
                deleteTransactions([transaction.id]);
              }}
              size="small"
            >
              <TrashIcon />
            </IconButton>
          ) : (
            <Box className="h-[30px]"></Box>
          )}
        </Box>
        <TransactionSplits
          transaction={transaction}
          isTransactionHovered={isTransactionHovered}
          onHovered={(value) => {
            setIsTransactionHovered(value);
          }}
        />
      </Box>
    </TransactionContext.Provider>
  );
};
