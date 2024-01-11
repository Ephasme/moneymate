import { Autocomplete, Box, ClickAwayListener, TextField } from "@mui/material";
import { useState } from "react";
import { useAccounts, usePatchTransactions } from "../../../../hooks/queries";
import { useTransactionContext } from "../useTransactionContext";

export const AccountCell = () => {
  const { transaction, setIsHovered } = useTransactionContext();
  const [edit, setEdit] = useState(false);
  const { data: accounts } = useAccounts();
  const { mutate: patchTransactions } = usePatchTransactions({
    onSuccess: () => {
      setEdit(false);
      setIsHovered(false);
    },
  });

  if (edit) {
    return (
      <ClickAwayListener
        onClickAway={() => {
          setEdit(false);
        }}
      >
        <Box className="flex items-center gap-2 h-full w-full mr-2">
          <Box className="flex-grow">
            <Autocomplete
              size="small"
              options={accounts ?? []}
              value={
                accounts?.find((x) => x.id === transaction.accountId) ?? null
              }
              onChange={(_, value) => {
                if (value) {
                  patchTransactions([
                    {
                      id: transaction.id,
                      accountId: value.id,
                    },
                  ]);
                }
              }}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField variant="standard" autoFocus {...params} />
              )}
            />
          </Box>
        </Box>
      </ClickAwayListener>
    );
  }

  return (
    <Box
      onClick={() => {
        setEdit(true);
      }}
      className="h-full w-full"
    >
      <Box className="py-[8px]">{transaction.accountName}</Box>
    </Box>
  );
};
