import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { useStore } from "../../store";

export const useEnvelopes = () => {
  const budgetId = useStore((state) => state.budgetId);
  const currentMonth = useStore((state) => state.currentMonth);
  return useQuery({
    queryKey: ["envelopes", { budgetId, currentMonth }],
    queryFn: () => api.getEnvelopes({ budgetId: budgetId! }, { currentMonth }),
    enabled: !!budgetId,
    placeholderData: [],
  });
};
