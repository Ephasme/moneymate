import { makePatch } from "@moneymate/shared";
import { Box } from "@mui/material";
import { useState } from "react";
import { usePatchTransactions } from "../../../hooks/queries";
import { useTransactionRowContext } from "./TransactionRowContext";

export const DescriptionCell = () => {
  const { transaction } = useTransactionRowContext();
  const { mutate: patchTransactions } = usePatchTransactions();
  const [inputValue, setInputValue] = useState(transaction.description ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const onSubmit = (value: string | null | undefined) => {
    patchTransactions([
      {
        id: transaction.id,
        description: makePatch(value),
      },
    ]);
  };
  if (isEditing) {
    return (
      <input
        autoFocus
        className="cell-border shadow-main rounded-md h-full px-2"
        style={{
          outline: "none",
          zIndex: 100,
          borderBottom: "1px solid #E5E7EB",
        }}
        onBlur={() => {
          setIsEditing(false);
        }}
        value={inputValue}
        onChange={(ev) => setInputValue(ev.target.value)}
        onKeyDown={(ev) => {
          if (ev.key === "Escape") {
            setIsEditing(false);
          } else if (ev.key === "Enter") {
            onSubmit(inputValue);
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
      className="cell flex items-center px-2"
    >
      <Box className="whitespace-nowrap overflow-hidden text-ellipsis">
        {transaction.description}
      </Box>
    </Box>
  );
};
