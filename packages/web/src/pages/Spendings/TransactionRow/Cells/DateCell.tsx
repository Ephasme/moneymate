import * as dateFns from "date-fns";
import { useTransactionRowContext } from "../useTransactionContext";
import { DatePicker } from "@mui/x-date-pickers";
import { produce } from "immer";
import { Box } from "@mui/material";

export const DateCell = () => {
  const { setTransaction, setIsEditing, transaction, isEditing } =
    useTransactionRowContext();
  if (isEditing)
    return (
      <Box className="mr-3">
        <DatePicker
          value={transaction.date}
          onChange={(date) => {
            if (date) {
              setTransaction(
                produce((transaction) => {
                  transaction.date = date;
                })
              );
            }
          }}
          slotProps={{
            textField: {
              size: "small",
              variant: "standard",
            },
          }}
        />
      </Box>
    );
  return (
    <Box
      onClick={() => {
        setIsEditing(true);
      }}
      className="flex justify-start w-full"
    >
      <Box>{dateFns.format(transaction.date, "dd MMM yy")}</Box>
    </Box>
  );
};
