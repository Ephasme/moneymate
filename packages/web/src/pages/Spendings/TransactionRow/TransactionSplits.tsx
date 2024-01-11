import { TransactionView } from "@moneymate/shared";
import { TransactionSplit } from "./TransactionSplit";

export const TransactionSplits = ({
  transaction,
  ...props
}: {
  transaction: TransactionView;
  isTransactionHovered: boolean;
  onHovered: (value: boolean) => void;
}) => {
  if (transaction.allocations.length <= 1) return null;
  return (
    <>
      {transaction.allocations.map((allocation, index) => {
        const isLastSplit = index === transaction.allocations.length - 1;
        return (
          <TransactionSplit
            key={allocation.id}
            allocation={allocation}
            bottomBorder={isLastSplit}
            {...props}
          />
        );
      })}
    </>
  );
};
