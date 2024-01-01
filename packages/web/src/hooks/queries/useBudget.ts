import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store";
import { queries } from "./queries";

export const useBudget = () => {
  const budgetId = useStore((state) => state.budgetId);
  const currentMonth = useStore((state) => state.currentMonth);
  return useQuery({
    ...queries.budgets.details(budgetId, { currentMonth }),
    enabled: !!budgetId,
  });
};
