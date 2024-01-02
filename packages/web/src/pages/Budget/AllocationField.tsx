import { EnvelopeView, MAIN_ENVELOPE_ID } from "@moneymate/shared";
import { Box, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { v4 as uuid } from "uuid";
import { formatCurrency } from "../../helpers/formatCurrency";
import * as mil from "../../helpers/mil";
import { usePostTransfers } from "../../hooks/queries";
import { useStore } from "../../store";

export const AllocationField = ({ envelope }: { envelope: EnvelopeView }) => {
  const budgetId = useStore((state) => state.budgetId);
  const { mutate: postTransfers } = usePostTransfers({
    onSuccess() {
      setEdit(false);
    },
  });
  const [isEdit, setEdit] = useState(false);
  const [value, setValue] = useState(envelope.allocated);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit && ref.current) {
      ref.current.focus();
    }
  }, [isEdit, ref]);

  if (isEdit) {
    return (
      <NumericFormat
        decimalScale={2}
        decimalSeparator=","
        customInput={TextField}
        fullWidth
        variant="standard"
        sx={{
          "&.MuiTextField-root": {
            minWidth: "5rem",
            marginLeft: "0.5rem",
            marginRight: "1rem",
            width: "100%",
            "& input": {
              fontWeight: "bold",
              textAlign: "right",
            },
          },
        }}
        thousandSeparator=" "
        value={mil.divToNumber(value)}
        inputRef={ref}
        onBlur={() => {
          setEdit(false);
        }}
        onValueChange={({ value }) => {
          if (value) {
            setValue(mil.mult(value));
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            postTransfers([
              {
                amount: (value - envelope.allocated).toString(),
                fromEnvelopeId: MAIN_ENVELOPE_ID,
                toEnvelopeId: envelope.id,
                budgetId,
                date: new Date().toISOString(),
                id: uuid(),
              },
            ]);
          }
        }}
      />
    );
  }

  return (
    <Box
      onClick={() => {
        setEdit(true);
      }}
      className="flex items-center justify-end mr-4"
    >
      <Box className="font-black text-right">
        {formatCurrency(envelope.allocated)}
      </Box>
    </Box>
  );
};
