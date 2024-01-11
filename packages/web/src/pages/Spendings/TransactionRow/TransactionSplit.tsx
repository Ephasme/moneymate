import { AllocationView } from "@moneymate/shared";
import { Box } from "@mui/material";
import classNames from "classnames";
import { AmountSpan } from "../../Common";
import { useTransactionContext } from "./useTransactionContext";

const useCommonProps = (bottomBorder: boolean) => {
  const { isHovered, setIsHovered } = useTransactionContext();
  return (className?: string) => ({
    className: classNames(
      ["cursor-pointer", "flex", "items-center", "h-full"],
      {
        "border-b border-[#D7D9DF] pb-5": bottomBorder,
        "bg-[#EAE8F2]": isHovered,
      }
    ).concat(className ?? ""),
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  });
};

export const TransactionSplit = ({
  allocation,
  bottomBorder,
}: {
  allocation: AllocationView;
  bottomBorder: boolean;
  isTransactionHovered: boolean;
  onHovered: (value: boolean) => void;
}) => {
  const commonProps = useCommonProps(bottomBorder);
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
