import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store";
import { queries } from "./queries";

export const usePayees = () => {
  const budgetId = useStore((state) => state.budgetId);
  return useQuery(queries.payees.list(budgetId));
};
