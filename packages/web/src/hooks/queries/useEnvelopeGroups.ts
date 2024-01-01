import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store";
import { queries } from "./queries";

export const useEnvelopeGroups = () => {
  const budgetId = useStore((state) => state.budgetId);
  return useQuery({
    ...queries.envelopeGroups.list({ budgetId }),
    enabled: !!budgetId,
    placeholderData: [],
  });
};
