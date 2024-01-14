import { Autocomplete, Box, TextField } from "@mui/material";
import { useTransactionRowContext } from "../useTransactionContext";
import { useAccounts } from "../../../../hooks/queries";
import { produce } from "immer";

export const AccountCell = () => {
  const { transaction, isEditing, setIsEditing, setTransaction } =
    useTransactionRowContext();
  const { data: accounts } = useAccounts();

  if (!accounts) return <div>Loading accounts...</div>;

  if (isEditing) {
    return (
      <Box className="flex w-full pr-3">
        <Autocomplete
          size="small"
          fullWidth
          options={accounts}
          value={accounts.find((a) => a.id === transaction.accountId) ?? null}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          getOptionKey={(option) => option.id}
          onChange={(_, value) => {
            setTransaction(
              produce((transaction) => {
                transaction.accountId = value?.id ?? null;
              })
            );
          }}
          renderInput={(params) => <TextField variant="standard" {...params} />}
        />
      </Box>
    );
  }

  return (
    <Box
      onClick={() => {
        setIsEditing(true);
      }}
      className="h-full w-full"
    >
      <Box className="py-[8px]">{transaction.accountName}</Box>
    </Box>
  );
};
