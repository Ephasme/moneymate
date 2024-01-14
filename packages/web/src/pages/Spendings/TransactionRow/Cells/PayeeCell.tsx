import { Autocomplete, Box, TextField } from "@mui/material";
import { useTransactionRowContext } from "../useTransactionContext";
import { usePayees } from "../../../../hooks/queries/usePayees";
import { produce } from "immer";

export const PayeeCell = () => {
  const { transaction, isEditing, setIsEditing, setTransaction } =
    useTransactionRowContext();
  const { data: payees } = usePayees();
  if (!payees) return <div>Loading payees...</div>;

  function findPayee(payeeName: string | null) {
    if (!payeeName) return null;
    return payees?.find((payee) => payee.name === payeeName) ?? null;
  }

  if (isEditing) {
    return (
      <Box className="flex items-center w-full h-full pr-3">
        <Autocomplete
          options={payees}
          fullWidth
          value={findPayee(transaction.payeeName)}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(props) => <TextField variant="standard" {...props} />}
          onChange={(_, value) => {
            setTransaction(
              produce((transaction) => {
                transaction.payeeName = value?.name ?? null;
              })
            );
          }}
        />
      </Box>
    );
  }
  return (
    <Box
      onClick={() => {
        setIsEditing(true);
      }}
      className="flex items-center w-full h-full"
    >
      <Box>{transaction.payeeName ?? "-"}</Box>
    </Box>
  );
};
