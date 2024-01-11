import { Box, ClickAwayListener, TextField } from "@mui/material";
import { AmountSpan } from "../../../Common";
import { useTransactionContext } from "../useTransactionContext";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import * as mil from "../../../../helpers/mil";
import { Formik } from "formik";
import { usePatchTransactions } from "../../../../hooks/queries";

export const AmountCell = () => {
  const { transaction } = useTransactionContext();
  const { mutate: patchTransactions } = usePatchTransactions({
    onSuccess: () => setEdit(false),
  });
  const [edit, setEdit] = useState(false);
  if (edit) {
    return (
      <ClickAwayListener onClickAway={() => setEdit(false)}>
        <Box className="flex w-full">
          <Formik
            onSubmit={(values) => {
              console.log(values);
              patchTransactions([
                {
                  id: transaction.id,
                  amount: values.amount.toString(),
                },
              ]);
            }}
            initialValues={{
              amount: transaction.amount,
            }}
          >
            {({ setFieldValue, submitForm, resetForm, values }) => (
              <NumericFormat
                customInput={TextField}
                decimalScale={2}
                size="small"
                fixedDecimalScale
                InputProps={{
                  sx: {
                    "& input": {
                      color: transaction.amount >= 0 ? "#37B692" : "black",
                      fontWeight: "bold",
                      textAlign: "right",
                    },
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    submitForm();
                    resetForm();
                    setEdit(false);
                  }
                }}
                onValueChange={({ value }) => {
                  if (value) {
                    setFieldValue("amount", mil.mult(value));
                  }
                }}
                fullWidth
                suffix=" €"
                decimalSeparator=","
                value={mil.divToNumber(values.amount)}
              />
            )}
          </Formik>
        </Box>
      </ClickAwayListener>
    );
  }
  return (
    <Box
      onClick={() => {
        setEdit(true);
      }}
      className="flex justify-end w-full"
    >
      <Box className="font-bold text-right pr-[14px]">
        <AmountSpan amount={transaction.amount} creditColor explicitPositive />
      </Box>
    </Box>
  );
};
