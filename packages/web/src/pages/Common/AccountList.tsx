import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { api } from "../../api";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useStore } from "../../store";
import { EditAccountDialog } from "../Budget/EditAccountDialog";

export const AccountList = () => {
  const navigate = useNavigate();
  const budgetId = useStore((state) => state.budgetId);
  const [open, setOpen] = useState(false);
  const [accountId, setAccountId] = useState<string | undefined>(undefined);
  const currentState = useMatch("/:budgetId/accounts/:accountId");

  const { data: accounts } = useQuery({
    queryKey: ["accounts", { budgetId }],
    queryFn: () => api.getAccounts({ budgetId }),
  });

  if (!accounts) return <Box>Loading accounts...</Box>;

  return (
    <Box className="flex flex-col overflow-auto">
      <Box className="flex flex-col gap-1">
        {accounts.length === 0 ? (
          <Box>You have no accounts</Box>
        ) : (
          accounts.map(({ id, name, clearedBalance, pendingBalance }) => (
            <Box
              className={`flex cursor-pointer rounded-lg p-2 px-4 hover:bg-[#374C9B] items-center ${
                currentState?.params.accountId === id ? "bg-[#374C9B]" : ""
              }`}
              key={id}
              onClick={() => {
                navigate(`/${budgetId}/accounts/${id}`);
              }}
            >
              <IconButton
                size="small"
                onClick={() => {
                  setAccountId(id);
                  setOpen(true);
                }}
              >
                <EditIcon fontSize="small" className="text-white" />
              </IconButton>
              <Box>{name}</Box>
              <Box className="flex flex-grow justify-end">
                {formatCurrency(clearedBalance + pendingBalance)}
              </Box>
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
