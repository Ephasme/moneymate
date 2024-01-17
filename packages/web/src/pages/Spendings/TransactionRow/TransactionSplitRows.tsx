import { Box } from "@mui/material";
import classNames from "classnames";
import { AmountSpan } from "../../Common";
import { useTransactionRowContext } from "./TransactionRowContext";
import { EnvelopeName } from "../../Common/EnvelopeName";

export const TransactionSplitRows = () => {
  const { transaction, hasSplits } = useTransactionRowContext();

  if (!hasSplits) return null;

  return (
    <>
      {transaction.allocations.map((allocation, index) => {
        const isLast = transaction.allocations.length - 1 === index;
        return (
          <Box
            key={allocation.id}
            className={classNames(["contents"], {
              "row-last": isLast,
            })}
          >
            <Box
              className={classNames(["cell"], {
                "pb-4": isLast,
                "pb-1": !isLast,
              })}
            ></Box>
            <Box
              className={classNames(["cell"], {
                "pb-4": isLast,
                "pb-1": !isLast,
              })}
            ></Box>
            <Box
              className={classNames(["cell"], {
                "pb-4": isLast,
                "pb-1": !isLast,
              })}
            ></Box>
            <Box
              className={classNames(["cell"], {
                "pb-4": isLast,
                "pb-1": !isLast,
              })}
            ></Box>
            <Box
              className={classNames(["cell"], {
                "pb-4": isLast,
                "pb-1": !isLast,
              })}
            ></Box>
            <Box
              className={classNames(["cell", "px-2"], {
                "pb-4": isLast,
                "pb-1": !isLast,
              })}
            >
              <EnvelopeName id={allocation.envelopeId} />
            </Box>
            <Box
              className={classNames(["cell", "flex", "justify-end", "px-2"], {
                "pb-4": isLast,
                "pb-1": !isLast,
              })}
            >
              <AmountSpan
                amount={allocation.amount}
                explicitPositive
                creditColor
              />
            </Box>
            <Box className="cell"></Box>
          </Box>
        );
      })}
    </>
  );
};
