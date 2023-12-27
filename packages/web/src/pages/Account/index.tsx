import { offset, useFloating } from "@floating-ui/react";
import ClearIcon from "@mui/icons-material/Copyright";
import UnclearIcon from "@mui/icons-material/CopyrightTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Checkbox, IconButton } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useAccount } from "../Common/useAccount";
import { useTransactions } from "../Common/useTransactions";
import { MainLayout } from "../Layouts";
import { TransactionEditRow } from "./TransactionEditRow";
import { TransactionRow } from "./TransactionRow";
import { useAccountsStore } from "./store";
import { ReconcileBanner } from "./ReconcileBanner";
import { ReconcileButton } from "./ReconcileButton";
import { useDeleteTransactions } from "../Common/useDeleteTransactions";
import { usePatchTransactions } from "../Common/usePatchTransactions";

export const Account = () => {
  const [showNewTransaction, setShowNewTransaction] = useState<boolean>(false);

  const { accountId } = useParams<{ accountId: string }>();
  const { data: account } = useAccount(accountId);
  const { data: transactions = [] } = useTransactions(accountId);
  const selectedTransactions = useAccountsStore(
    (state) => state.selectedTransactions
  );
  const clearTransactions = useAccountsStore(
    (state) => state.clearTransactions
  );
  const { refs, floatingStyles } = useFloating({
    open: selectedTransactions.length > 0,
    placement: "bottom",
    middleware: [offset(-80)],
  });

  const { mutate: deleteTransactions } = useDeleteTransactions({
    onSuccess() {
      clearTransactions();
    },
  });

  const { mutate: patchTransactions } = usePatchTransactions({
    onSuccess() {
      clearTransactions();
    },
  });

  const computeSelectionBalance = () => {
    let balance = 0n;
    for (const transaction of transactions) {
      if (selectedTransactions.includes(transaction.id)) {
        balance += transaction.amount;
      }
    }
    return formatCurrency(balance);
  };

  if (!account) return <Box>Loading...</Box>;

  return (
    <MainLayout>
      <Box className="flex flex-col flex-grow" ref={refs.setReference}>
        <Box className="flex-grow flex flex-col items-start justify-stretch">
          <Box className="w-full flex items-center justify-between pt-5 px-4 ">
            <Box className="text-3xl">{account.name}</Box>
            <Box className="flex items-center gap-2">
              <IconButton size="large">
                <EditIcon fontSize="large" />
              </IconButton>
              <ReconcileButton />
            </Box>
          </Box>
          <Box className="flex flex-row w-full p-4 mt-4 mb-4 border-t border-b border-solid border-slate-300">
            <Box className="flex flex-col">
              <Box className="text-xl">
                {formatCurrency(
                  account.clearedBalance + account.reconciledBalance
                )}
              </Box>
              <Box className="text-sm">Cleared</Box>
            </Box>
            <Box className="px-4 text-3xl">+</Box>
            <Box className="flex flex-col">
              <Box className="text-xl">
                {formatCurrency(account.pendingBalance)}
              </Box>
              <Box className="text-sm">Pending</Box>
            </Box>
            <Box className="px-4 text-3xl">=</Box>
            <Box className="flex flex-col">
              <Box className="text-xl">
                {formatCurrency(
                  account.clearedBalance +
                    account.pendingBalance +
                    account.reconciledBalance
                )}
              </Box>
              <Box className="text-sm">Total</Box>
            </Box>
          </Box>
          <Box className="flex w-full items-center justify-between px-4 pb-4">
            <Button
              variant="contained"
              onClick={() => {
                setShowNewTransaction(true);
              }}
            >
              Add transaction
            </Button>
          </Box>
          <ReconcileBanner accountId={account.id} />
          <Box className="grid grid-cols-[38px_170px_1fr_1fr_1fr_1fr_1fr_38px] w-full">
            <Box className="contents uppercase">
              <Box className="flex items-center border-b border-t border-solid border-slate-300 justify-center">
                <Checkbox size="small" />
              </Box>
              <Box className="flex items-center border-b border-t border-l border-solid border-slate-300 pl-[calc(8px_+_14px)]">
                <Box>Date</Box>
              </Box>
              <Box className="flex items-center border-b border-t border-l border-solid border-slate-300 pl-[calc(8px_+_6px)]">
                <Box>Account</Box>
              </Box>
              <Box className="flex items-center border-b border-t border-l border-solid border-slate-300 pl-[calc(8px_+_6px)]">
                <Box>Envelope</Box>
              </Box>
              <Box className="flex items-center border-b border-t border-l border-solid border-slate-300 pl-[calc(8px_+_6px)]">
                <Box>Description</Box>
              </Box>
              <Box className="flex items-center justify-end border-b border-t border-l border-solid border-slate-300 pr-[calc(8px_+_14px)]">
                <Box>Debit</Box>
              </Box>
              <Box className="flex items-center justify-end border-b border-t border-l border-solid border-slate-300 pr-[calc(8px_+_14px)]">
                <Box>Credit</Box>
              </Box>
              <Box className="flex items-center border-b border-t border-l border-solid border-slate-300 pl-[calc(8px_+_14px)]">
                <Box></Box>
              </Box>
            </Box>
            {showNewTransaction && (
              <TransactionEditRow
                accountId={account.id}
                onCancel={() => {
                  setShowNewTransaction(false);
                }}
              />
            )}
            {transactions?.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transactionId={transaction.id}
                accountId={account.id}
              />
            ))}
          </Box>
        </Box>
        {selectedTransactions.length > 0 && (
          <Box
            className="flex flex-row items-center bg-black text-white p-2 px-4 rounded-md"
            ref={refs.setFloating}
            style={{ ...floatingStyles }}
          >
            <button
              className="pr-4"
              onClick={() => {
                clearTransactions();
              }}
            >
              x
            </button>
            <Box className="flex flex-col pr-4">
              <Box className="">{selectedTransactions.length} transactions</Box>
              <Box className="text-xs">
                {computeSelectionBalance()} selected
              </Box>
            </Box>
            <Box className="hover:bg-slate-700 rounded-md flex items-center ml-4">
              <DeleteIcon className="ml-1" />
              <button
                className="p-2"
                onClick={() => {
                  deleteTransactions(selectedTransactions);
                }}
              >
                Delete
              </button>
            </Box>
            <Box className="hover:bg-slate-700 rounded-md flex items-center ml-4">
              <ClearIcon className="ml-1" />
              <button
                className="p-2"
                onClick={() => {
                  patchTransactions({
                    list: selectedTransactions.map((id) => ({
                      id,
                      status: "cleared",
                    })),
                  });
                }}
              >
                Clear
              </button>
            </Box>
            <Box className="hover:bg-slate-700 rounded-md flex items-center ml-4">
              <UnclearIcon className="ml-1" />
              <button
                className="p-2"
                onClick={() => {
                  patchTransactions({
                    list: selectedTransactions.map((id) => ({
                      id,
                      status: "pending",
                    })),
                  });
                }}
              >
                Unclear
              </button>
            </Box>
            <Box className="hover:bg-slate-700 rounded-md flex items-center ml-4">
              <MoreIcon className="ml-1" />
              <button className="p-2" onClick={() => {}}>
                More
              </button>
            </Box>
          </Box>
        )}
      </Box>
    </MainLayout>
  );
};
