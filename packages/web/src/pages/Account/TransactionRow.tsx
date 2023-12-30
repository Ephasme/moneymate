import { useState } from "react";
import { TransactionRowReadonly } from "./TransactionRowReadonly";
import { TransactionRowEdit } from "./TransactionRowEdit";

export const TransactionRow = ({
  transactionId,
  accountId,
}: {
  transactionId: string;
  accountId: string;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return isEditing ? (
    <TransactionRowEdit
      accountId={accountId}
      transactionId={transactionId}
      onCancel={() => {
        setIsEditing(false);
      }}
    />
  ) : (
    <TransactionRowReadonly
      transactionId={transactionId}
      onEdit={() => {
        setIsEditing(true);
      }}
    />
  );
};
