import { HTMLProps } from "react";
import { formatCurrency } from "../../helpers/formatCurrency";

export const AmountSpan = ({
  amount,
  creditColor = false,
  debitColor = false,
  explicitPositive = false,
  ...props
}: {
  amount: bigint;
  creditColor?: boolean;
  debitColor?: boolean;
  explicitPositive?: boolean;
} & HTMLProps<HTMLSpanElement>) => {
  const color =
    amount > 0n
      ? creditColor
        ? "text-[#37B692]"
        : "text-black"
      : debitColor
      ? "text-[#FF1D36]"
      : "text-black";

  const prefix = amount > 0n && explicitPositive ? "+" : "";

  return (
    <span className={`${color}`} {...props}>
      {prefix}
      {formatCurrency(amount)}
    </span>
  );
};
