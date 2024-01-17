import { Box } from "@mui/material";
import { useState } from "react";
import { usePatchTransactions } from "../../../hooks/queries";
import { AmountSpan } from "../../Common";
import { AmountInput } from "../../Common/AmountInput";
import { useTransactionRowContext } from "./TransactionRowContext";

export const AmountCell = () => {
  const { transaction } = useTransactionRowContext();
  const { mutate: patchTransactions } = usePatchTransactions();
  const [inputValue, setInputValue] = useState(transaction.amount ?? 0n);
  const [isEditing, setIsEditing] = useState(false);
  const onSubmit = () => {
    patchTransactions([
      {
        id: transaction.id,
        amount: inputValue.toString(),
      },
    ]);
  };
  if (isEditing) {
    return (
      <AmountInput
        value={inputValue}
        onChange={(value) => {
          setInputValue(value);
        }}
        onBlur={() => {
          setIsEditing(false);
        }}
        onKeyDown={(ev) => {
          if (ev.key === "Escape") {
            setIsEditing(false);
          } else if (ev.key === "Enter") {
            onSubmit();
            setIsEditing(false);
          }
        }}
      />
    );
  }
  return (
    <Box
      onClick={() => {
        setIsEditing(true);
      }}
      className="cell flex justify-end items-center text-right font-bold px-2"
    >
      <AmountSpan amount={transaction.amount} creditColor explicitPositive />
    </Box>
  );
};
