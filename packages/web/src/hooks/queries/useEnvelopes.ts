import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store";
import { queries } from "./queries";

export const useEnvelopes = () => {
  const budgetId = useStore((state) => state.budgetId);
  const currentMonth = useStore((state) => state.currentMonth);
  return useQuery({
    ...queries.envelopes.list({ budgetId, currentMonth }),
    enabled: !!budgetId,
    placeholderData: [],
  });
};
