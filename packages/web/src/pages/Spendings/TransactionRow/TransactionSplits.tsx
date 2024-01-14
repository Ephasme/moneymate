import { Box } from "@mui/material";
import { produce } from "immer";
import {
  AddTransactionSplit,
  ButtonsTransactionSplit,
  SpaceTransactionSplit,
  TransactionSplit,
} from "./TransactionSplit";
import { useTransactionRowContext } from "./useTransactionContext";

export const TransactionSplits = () => {
  const { transaction, setTransaction, isEditing } = useTransactionRowContext();
  const showSplits = transaction.allocations.length > 1;
  const splits = transaction.allocations.map((allocation) => {
    return (
      <TransactionSplit
        key={allocation.id}
        allocation={allocation}
        onChange={(newAllocation) => {
          setTransaction(
            produce((transaction) => {
              const allocationIndex = transaction.allocations.findIndex(
                (allocation) => allocation.id === newAllocation.id
              );
              transaction.allocations[allocationIndex] = newAllocation;
            })
          );
        }}
      />
    );
  });
  return (
    <Box className="contents">
      {showSplits && splits}
      {isEditing && <AddTransactionSplit />}
      {isEditing && <ButtonsTransactionSplit />}
      {showSplits && <SpaceTransactionSplit />}
    </Box>
  );
};
