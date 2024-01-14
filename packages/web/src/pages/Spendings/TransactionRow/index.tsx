import { TransactionView } from "@moneymate/shared";
import { Box, ClickAwayListener, IconButton } from "@mui/material";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDeleteTransactions } from "../../../hooks/queries";
import { TrashIcon } from "../../../icons/TrashIcon";
import { TransactionEdit } from "../../TransactionEdit";
import { AccountCell } from "./Cells/AccountCell";
import { AmountCell } from "./Cells/AmountCell";
import { DateCell } from "./Cells/DateCell";
import { EnvelopeCell } from "./Cells/EnvelopeCell";
import { PayeeCell } from "./Cells/PayeeCell";
import { TransactionSplits } from "./TransactionSplits";
import { TransactionRowContext } from "./useTransactionContext";

export const TransactionRow = ({
  transaction: initialTransaction,
}: {
  transaction?: TransactionView;
}) => {
  const buildTransaction = (): TransactionEdit => {
    return {
      accountId: initialTransaction?.accountId ?? null,
      accountName: initialTransaction?.accountName ?? null,
      allocations: (initialTransaction?.allocations ?? []).map(
        (allocation) => ({
          id: allocation.id,
          envelopeId: allocation.envelopeId,
          envelopeName: allocation.envelopeName,
          amount: allocation.amount,
        })
      ),
      amount: initialTransaction?.amount ?? 0n,
      date: initialTransaction?.date
        ? new Date(initialTransaction.date)
        : new Date(),
      payeeName: initialTransaction?.payee ?? null,
    };
  };
  const { mutate: deleteTransactions } = useDeleteTransactions();
  const [isTransactionHovered, setIsTransactionHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [transaction, setTransaction] = useState<TransactionEdit>(
    buildTransaction()
  );

  const commonProps = (className: string = "") => ({
    className: classNames(
      ["cursor-pointer", "flex", "items-center", "py-2", "h-full"],
      {
        "bg-[#EAE8F2]": isTransactionHovered,
        "pb-2": transaction.allocations.length > 1,
      }
    ).concat(` ${className}`),
    onMouseEnter: () => setIsTransactionHovered(true),
    onMouseLeave: () => setIsTransactionHovered(false),
  });

  const resetTransaction = () => {
    setTransaction(buildTransaction());
  };

  return (
    <TransactionRowContext.Provider
      value={{
        transaction,
        setTransaction,
        resetTransaction,
        isHovered: isTransactionHovered,
        isEditing,
        setIsHovered: (state) => setIsTransactionHovered(state),
        setIsEditing: (state) => setIsEditing(state),
      }}
    >
      <ClickAwayListener
        onClickAway={() => {
          setIsEditing(false);
          resetTransaction();
        }}
      >
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
            {initialTransaction && (
              <Box>
                {isTransactionHovered ? (
                  <IconButton
                    onClick={() => {
                      deleteTransactions([initialTransaction.id]);
                    }}
                    size="small"
                  >
                    <TrashIcon />
                  </IconButton>
                ) : (
                  <Box className="h-[30px]"></Box>
                )}
              </Box>
            )}
          </Box>
          <TransactionSplits />
        </Box>
      </ClickAwayListener>
    </TransactionRowContext.Provider>
  );
};
