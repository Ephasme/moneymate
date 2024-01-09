import { TransactionView } from "@moneymate/shared";
import { Box, IconButton } from "@mui/material";
import { AssignEnvelope } from "./AssignEnvelope";
import { TransactionSplits } from "./TransactionSplits";
import { TrashIcon } from "../../../icons/TrashIcon";
import { AmountSpan } from "../../Common";
import * as dateFns from "date-fns";
import classNames from "classnames";
import { useState } from "react";

export const TransactionRow = ({
  transaction,
}: {
  transaction: TransactionView;
}) => {
  const [isTransactionHovered, setIsTransactionHovered] = useState(false);
  const commonProps = (className: string = "") => ({
    className: classNames(
      ["cursor-pointer", "flex", "items-center", "py-4", "h-full"],
      {
        "border-b border-[#D7D9DF]": transaction.allocations.length <= 1,
        "bg-[#EAE8F2]": isTransactionHovered,
      }
    ).concat(` ${className}`),
    onMouseEnter: () => setIsTransactionHovered(true),
    onMouseLeave: () => setIsTransactionHovered(false),
  });
  return (
    <Box className="contents">
      <Box {...commonProps("pl-3")}>{transaction.payee ?? "-"}</Box>
      <Box {...commonProps("text-sm")}>
        {dateFns.format(new Date(transaction.date), "dd MMM yy")} ·{" "}
        {transaction.accountName}
      </Box>
      <Box {...commonProps("text-sm")}>
        {transaction.allocations.length > 1 ? (
          <Box className="italic">Dépense divisée</Box>
        ) : transaction.allocations.length === 1 ? (
          <Box>{transaction.allocations[0].envelopeName}</Box>
        ) : (
          <AssignEnvelope />
        )}
      </Box>
      <Box {...commonProps()}>
        <Box className="w-full font-bold text-right">
          <AmountSpan
            amount={transaction.amount}
            creditColor
            explicitPositive
          />
        </Box>
      </Box>
      <Box {...commonProps("flex justify-center")}>
        {isTransactionHovered ? (
          <IconButton size="small">
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
  );
};
