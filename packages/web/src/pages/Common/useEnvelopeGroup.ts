import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { useStore } from "../../store";

export const useEnvelopeGroup = (envelopeGroupId: string | undefined) => {
  const budgetId = useStore((state) => state.budgetId);
  const currentMonth = useStore((state) => state.currentMonth);
  const { data: envelopeGroup } = useQuery({
    queryKey: ["envelope-groups", { budgetId, envelopeGroupId, currentMonth }],
    queryFn: () =>
      api.getEnvelopeGroup({ envelopeGroupId: envelopeGroupId!, budgetId }),
    enabled: !!budgetId && !!envelopeGroupId,
  });
  return envelopeGroup;
};
