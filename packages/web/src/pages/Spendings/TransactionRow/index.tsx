import { Box } from "@mui/material";
import classNames from "classnames";
import { useState } from "react";
import { usePatchTransactions, useTransaction } from "../../../hooks/queries";
import { AccountCell } from "./AccountCell";
import { CheckboxCell } from "./CheckboxCell";
import { DateCell } from "./DateCell";
import { DescriptionCell } from "./DescriptionCell";
import { EnvelopeCell } from "./EnvelopeCell";
import { PayeeCell } from "./PayeeCell";
import { TransactionRowContext } from "./TransactionRowContext";
import { AmountCell } from "./AmountCell";
import { StatusCell } from "./StatusCell";
import { TransactionSplitRows } from "./TransactionSplitRows";
import { TransactionView } from "@moneymate/shared";

export const TransactionRow = ({ id }: { id?: string }) => {
  const { data: transaction } = useTransaction(id);
  const { mutate: patchTransactions } = usePatchTransactions();
  const [isHovered, setIsHovered] = useState(false);

  if (!transaction) return <Box>Loading...</Box>;
  const hasSplits = transaction.allocations.length > 1;

  function onTransactionChange(value: TransactionView) {
    patchTransactions([{ id: value.id, amount: value.amount.toString() }]);
  }

  return (
    <TransactionRowContext.Provider
      value={{
        transaction,
        onTransactionChange,
        isHovered,
        setIsHovered,
        hasSplits,
      }}
    >
      <Box
        className="contents row"
        sx={{
          "&.row:hover .cell": {
            backgroundColor: "#EAE8F2",
            cursor: "pointer",
          },
          "& .row-last .cell,.cell-border": {
            borderBottom: "1px solid #BCC0CD",
          },
        }}
      >
        <Box
          className={classNames(["contents", "row-main"], {
            "row-last": !hasSplits,
          })}
        >
          <CheckboxCell />
          <PayeeCell />
          <DateCell />
          <AccountCell />
          <DescriptionCell />
          <EnvelopeCell />
          <AmountCell />
          <StatusCell />
        </Box>
        <TransactionSplitRows />
      </Box>
    </TransactionRowContext.Provider>
  );
};
