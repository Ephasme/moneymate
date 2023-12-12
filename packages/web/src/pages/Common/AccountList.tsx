import { Box, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../../api";
import { useStore } from "../../store";
import { EditAccountDialog } from "../Budget/EditAccountDialog";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../helpers/formatCurrency";

export const AccountList = () => {
  const navigate = useNavigate();
  const budgetId = useStore((state) => state.budgetId);
  const [open, setOpen] = useState(false);
  const [accountId, setAccountId] = useState<string | undefined>(undefined);

  const { data: accounts } = useQuery({
    queryKey: ["accounts", { budgetId }],
    queryFn: () => api.getAccounts({ budgetId }),
  });

  if (!accounts) return <Box>Loading accounts...</Box>;

  return (
    <Box>
      <Box>
        {accounts.length === 0 ? (
          <Box>You have no accounts</Box>
        ) : (
          accounts.map(({ id, name, clearedBalance, pendingBalance }) => (
            <Box
              key={id}
              onClick={() => {
                navigate(`/${budgetId}/accounts/${id}`);
              }}
            >
              <Box>{name}</Box>
              <Box>{formatCurrency(clearedBalance)}</Box>
              <Button
                onClick={() => {
                  setAccountId(id);
                  setOpen(true);
                }}
              >
                Edit
              </Button>
            </Box>
          ))
        )}
      </Box>
      <Button
        onClick={() => {
          setAccountId(undefined);
          setOpen(true);
        }}
      >
        Add
      </Button>
      <EditAccountDialog
        accountId={accountId}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
};
