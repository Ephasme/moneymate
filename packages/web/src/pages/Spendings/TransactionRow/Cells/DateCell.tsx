import * as dateFns from "date-fns";
import { useTransactionContext } from "../useTransactionContext";

export const DateCell = () => {
  const transaction = useTransactionContext();
  return dateFns.format(new Date(transaction.date), "dd MMM yy");
};
