import { Box, TextField } from "@mui/joy";
import { AmountSpan } from "../../../Common";
import { useTransactionContext } from "../useTransactionContext";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import * as mil from "../../../../helpers/mil";

export const AmountCell = () => {
  const transaction = useTransactionContext();
  const [currentAmount, setCurrentAmount] = useState(transaction.amount);
  const [edit, setEdit] = useState(false);
  if (edit) {
    return (
      // <ClickAwayListener onClickAway={() => setEdit(false)}>
      <Box className="flex w-full">
        <NumericFormat
          customInput={TextField}
          decimalScale={2}
          fixedDecimalScale
          suffix=" €"
          decimalSeparator=","
          value={mil.divToNumber(currentAmount)}
          onValueChange={({ value }) => {
            setCurrentAmount(mil.mult(value));
          }}
        />
      </Box>
      // </ClickAwayListener>
    );
  }
  return (
    <Box
      onClick={() => {
        setEdit(true);
      }}
      className="flex justify-end w-full"
    >
      <Box className="font-bold text-right">
        <AmountSpan amount={transaction.amount} creditColor explicitPositive />
      </Box>
    </Box>
  );
};
