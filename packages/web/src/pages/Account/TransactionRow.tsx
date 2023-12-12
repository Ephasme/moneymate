import { useState } from "react";
import { TransactionReadonlyRow } from "./TransactionReadonlyRow";
import { TransactionEditRow } from "./TransactionEditRow";

export const TransactionRow = ({
  transactionId,
  accountId,
}: {
  transactionId: string;
  accountId: string;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return isEditing ? (
    <TransactionEditRow
      accountId={accountId}
      transactionId={transactionId}
      onCancel={() => {
        setIsEditing(false);
      }}
    />
  ) : (
    <TransactionReadonlyRow
      transactionId={transactionId}
      onEdit={() => {
        setIsEditing(true);
      }}
    />
  );
};
