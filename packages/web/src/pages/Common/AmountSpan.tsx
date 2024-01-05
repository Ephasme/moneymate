import { CSSProperties, useLayoutEffect, useState } from "react";
import { formatCurrency } from "../../helpers/formatCurrency";

export const AmountSpan = ({
  amount,
  baseFontSize = 16,
  className = "",
  style = {},
}: {
  amount: bigint;
  baseFontSize?: number;
  className?: string;
  style?: CSSProperties;
}) => {
  const [fontSize, setFontSize] = useState(baseFontSize);

  useLayoutEffect(() => {
    const length = amount.toString().length;
    if (length > 5) {
      setFontSize(baseFontSize - (length - 5));
    }
  }, [baseFontSize, amount]);

  return (
    <span className={className} style={{ fontSize: `${fontSize}px`, ...style }}>
      {formatCurrency(amount)}
    </span>
  );
};
