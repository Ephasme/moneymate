import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { useStore } from "../../store";

export const useEnvelope = (envelopeId: string | undefined) => {
  const budgetId = useStore((state) => state.budgetId);
  const currentMonth = useStore((state) => state.currentMonth);
  const { data: envelope } = useQuery({
    queryKey: ["envelopes", { budgetId, envelopeId, currentMonth }],
    queryFn: () =>
      api.getEnvelope({ envelopeId: envelopeId!, budgetId }, { currentMonth }),
    enabled: !!budgetId && !!envelopeId,
  });
  return envelope;
};
