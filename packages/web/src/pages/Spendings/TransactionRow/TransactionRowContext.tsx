import { TransactionView } from "@moneymate/shared";
import { createContext, useContext } from "react";

export const TransactionRowContext = createContext<{
  transaction: TransactionView;
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
  hasSplits: boolean;
}>(null!);

export const useTransactionRowContext = () => {
  return useContext(TransactionRowContext);
};
