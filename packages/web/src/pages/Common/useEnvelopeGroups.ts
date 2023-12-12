import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { useStore } from "../../store";

export const useEnvelopeGroups = () => {
  const budgetId = useStore((state) => state.budgetId);
  return useQuery({
    queryKey: ["envelope-groups", { budgetId }],
    queryFn: () => api.getEnvelopeGroups({ budgetId: budgetId! }),
    enabled: !!budgetId,
    placeholderData: [],
  });
};
