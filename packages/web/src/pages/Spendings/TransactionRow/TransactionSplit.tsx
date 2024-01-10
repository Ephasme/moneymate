import { AllocationView } from "@moneymate/shared";
import { Box } from "@mui/material";
import classNames from "classnames";
import { AmountSpan } from "../../Common";

export const TransactionSplit = ({
  allocation,
  isLastSplit,
  onHovered,
  isTransactionHovered,
}: {
  allocation: AllocationView;
  isLastSplit: boolean;
  isTransactionHovered: boolean;
  onHovered: (value: boolean) => void;
}) => {
  const commonProps = (className?: string) => ({
    className: classNames(
      ["cursor-pointer", "flex", "items-center", "h-full"],
      {
        "border-b border-[#D7D9DF] pb-5": isLastSplit,
        "bg-[#EAE8F2]": isTransactionHovered,
      }
    ).concat(className ?? ""),
    onMouseEnter: () => onHovered(true),
    onMouseLeave: () => onHovered(false),
  });
  return (
    <>
      <Box {...commonProps()}></Box>
      <Box {...commonProps()}></Box>
      <Box {...commonProps()}></Box>
      <Box {...commonProps()}>
        <Box className="">{allocation.envelopeName}</Box>
      </Box>
      <Box {...commonProps()}>
        <Box className="w-full text-right">
          <AmountSpan amount={allocation.amount} creditColor explicitPositive />
        </Box>
      </Box>
      <Box {...commonProps()}></Box>
    </>
  );
};
