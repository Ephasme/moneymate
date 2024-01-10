import { TransactionView } from "@moneymate/shared";
import { createContext, useContext } from "react";

export const TransactionContext = createContext<TransactionView>(null!);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionContext"
    );
  }
  return context;
};
