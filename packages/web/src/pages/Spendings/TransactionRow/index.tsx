import { TransactionView } from "@moneymate/shared";
import { Box, IconButton } from "@mui/material";
import { AssignEnvelope } from "./AssignEnvelope";
import { TransactionSplits } from "./TransactionSplits";
import { TrashIcon } from "../../../icons/TrashIcon";
import { AmountSpan } from "../../Common";
import * as dateFns from "date-fns";
import classNames from "classnames";
import { useState } from "react";
import { useDeleteTransactions } from "../../../hooks/queries";

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
      ["cursor-pointer", "flex", "items-center", "py-4", "h-full"],
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
    <Box className="contents">
      <Box {...commonProps("pl-3")}>{transaction.payee ?? "-"}</Box>
      <Box {...commonProps("text-sm")}>
        {dateFns.format(new Date(transaction.date), "dd MMM yy")} ·{" "}
        {transaction.accountName}
      </Box>
      <Box {...commonProps("text-sm")}>
        {transaction.allocations.length === 1 ? (
          <AssignEnvelope
            trigger={({ onClick }) => (
              <Box onClick={onClick}>
                {transaction.allocations[0].envelopeName}
              </Box>
            )}
            transaction={transaction}
          />
        ) : transaction.allocations.length > 1 ? (
          <AssignEnvelope
            trigger={({ onClick }) => (
              <Box onClick={onClick} className="italic">
                Dépense divisée
              </Box>
            )}
            transaction={transaction}
          />
        ) : (
          <AssignEnvelope
            transaction={transaction}
            trigger={({ onClick }) => {
              return (
                <Box
                  onClick={onClick}
                  className="text-[#ED4800] font-bold underline underline-offset-2"
                >
                  Assigner une enveloppe
                </Box>
              );
            }}
          />
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
  );
};
