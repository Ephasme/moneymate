import { NumericFormat, NumericFormatProps } from "react-number-format";
import * as mil from "../../helpers/mil";

export const AmountInput = ({
  value,
  onChange = () => {},
  ...props
}: Omit<NumericFormatProps, "onChange" | "value"> & {
  value: bigint;
  onChange?: (value: bigint) => void;
}) => {
  return (
    <NumericFormat
      decimalScale={2}
      decimalSeparator=","
      thousandSeparator=" "
      fixedDecimalScale
      suffix=" €"
      autoFocus
      className="outline-none cell-border shadow-main rounded-md h-full px-2 text-right font-bold"
      value={mil.divToNumber(value)}
      onValueChange={({ value }) => {
        onChange(mil.mult(value));
      }}
      {...props}
    />
  );
};
