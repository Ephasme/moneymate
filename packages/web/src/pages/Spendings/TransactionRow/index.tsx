import { Box } from "@mui/material";
import classNames from "classnames";
import { useState } from "react";
import { useTransaction } from "../../../hooks/queries";
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

export const TransactionRow = ({ id }: { id?: string }) => {
  const { data: transaction } = useTransaction(id);
  const [isHovered, setIsHovered] = useState(false);

  if (!transaction) return <Box>Loading...</Box>;
  const hasSplits = transaction.allocations.length > 1;

  return (
    <TransactionRowContext.Provider
      value={{ transaction, isHovered, setIsHovered, hasSplits }}
    >
      <Box className="contents row">
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
