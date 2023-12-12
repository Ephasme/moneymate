import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { useStore } from "../../store";

export const useBudget = () => {
  const budgetId = useStore((state) => state.budgetId);
  const currentMonth = useStore((state) => state.currentMonth);
  return useQuery({
    queryKey: ["budgets", { budgetId, currentMonth }],
    queryFn: () => api.getBudget({ budgetId }, { currentMonth }),
    enabled: !!budgetId,
  });
};
