import { Box, TextField } from "@mui/material";
import { AmountSpan } from "../../../Common";
import { useTransactionRowContext } from "../useTransactionContext";
import { NumericFormat } from "react-number-format";
import * as mil from "../../../../helpers/mil";
import { produce } from "immer";

export const AmountCell = () => {
  const { transaction, isEditing, setTransaction, setIsEditing } =
    useTransactionRowContext();

  if (isEditing) {
    return (
      <Box className="flex justify-end pl-2 w-full">
        <Box className="font-bold text-right">
          <NumericFormat
            decimalScale={2}
            fixedDecimalScale
            suffix=" €"
            decimalSeparator=","
            variant="standard"
            value={mil.divToNumber(transaction.amount)}
            customInput={TextField}
            sx={{
              "& input": {
                textAlign: "right",
              },
            }}
            onValueChange={({ value }) => {
              if (value) {
                setTransaction(
                  produce((transaction) => {
                    transaction.amount = mil.mult(value);
                  })
                );
              }
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      onClick={() => {
        setIsEditing(true);
      }}
      className="flex justify-end w-full"
    >
      <Box className="font-bold text-right">
        <AmountSpan amount={transaction.amount} creditColor explicitPositive />
      </Box>
    </Box>
  );
};
