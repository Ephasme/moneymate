import { Box } from "@mui/material";
import * as datefns from "date-fns";
import fr from "date-fns/locale/fr";
import { useTransactionRowContext } from "./TransactionRowContext";

export const DateCell = () => {
  const { transaction } = useTransactionRowContext();
  return (
    <Box className="cell flex items-center text-[#6D6F7B] px-2">
      {datefns.format(new Date(transaction.date), "dd MMM yy", {
        locale: fr,
      })}
    </Box>
  );
};
