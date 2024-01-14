import { createContext, useContext } from "react";
import { TransactionEdit } from "../../TransactionEdit";

export const TransactionRowContext = createContext<{
  transaction: TransactionEdit;
  setTransaction: React.Dispatch<React.SetStateAction<TransactionEdit>>;
  resetTransaction: () => void;
  isHovered: boolean;
  isEditing: boolean;
  setIsHovered: (state: boolean) => void;
  setIsEditing: (state: boolean) => void;
}>(null!);

export const useTransactionRowContext = () => {
  const context = useContext(TransactionRowContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionContext"
    );
  }
  return context;
};
