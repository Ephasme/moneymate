import { makePatch } from "@moneymate/shared";
import { Autocomplete, Box, ClickAwayListener, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { usePatchTransactions } from "../../../../hooks/queries";
import { usePayees } from "../../../../hooks/queries/usePayees";
import { useTransactionContext } from "../useTransactionContext";

export const PayeeCell = () => {
  const { transaction, setIsHovered } = useTransactionContext();
  const [edit, setEdit] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const { mutate: patchTransactions } = usePatchTransactions();
  const { data: payees = [] } = usePayees();

  if (edit) {
    return (
      <ClickAwayListener
        onClickAway={() => {
          setEdit(false);
        }}
      >
        <Box className="flex-grow pr-3">
          <Autocomplete
            size="small"
            fullWidth
            ref={ref}
            freeSolo
            onBlur={() => {
              setEdit(false);
            }}
            value={transaction.payee ?? null}
            onChange={(_, value) => {
              const payee =
                typeof value === "string" ? value : value ? value.name : null;
              patchTransactions([
                { id: transaction.id, payee: makePatch(payee) },
              ]);
              setEdit(false);
              setIsHovered(false);
            }}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              return option.name;
            }}
            options={payees}
            sx={{
              ".MuiInputBase-root": {
                borderRadius: "999rem",
              },
            }}
            renderInput={(params) => (
              <TextField autoFocus {...params} placeholder="Acheté chez..." />
            )}
          />
        </Box>
      </ClickAwayListener>
    );
  }

  return (
    <Box
      className="flex items-center w-full h-full"
      onClick={() => {
        setEdit(true);
      }}
    >
      <Box className="py-[8px] pl-[14px]">{transaction.payee ?? "-"}</Box>
    </Box>
  );
};
