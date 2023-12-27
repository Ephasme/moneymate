import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { useStore } from "../../store";

export const useEnvelopeGroup = (envelopeGroupId: string | undefined) => {
  const currentMonth = useStore((state) => state.currentMonth);
  const { data: envelopeGroup } = useQuery({
    queryKey: ["envelope-groups", { envelopeGroupId, currentMonth }],
    queryFn: () => api.getEnvelopeGroup({ envelopeGroupId: envelopeGroupId! }),
    enabled: !!envelopeGroupId,
  });
  return envelopeGroup;
};
