import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store";
import { queries } from "./queries";

export const useEnvelope = (envelopeId: string | undefined) => {
  const currentMonth = useStore((state) => state.currentMonth);
  const { data: envelope } = useQuery({
    ...queries.envelopes.details(envelopeId!, { currentMonth }),
    enabled: !!envelopeId,
  });
  return envelope;
};
