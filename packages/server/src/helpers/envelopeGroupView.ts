import { EnvelopeGroupViewInput } from "@moneymate/shared";
import { EnvelopeGroup } from "../entities";

export const envelopeGroupView = (
  envelopeGroup: EnvelopeGroup
): EnvelopeGroupViewInput => {
  return {
    id: envelopeGroup.id,
    name: envelopeGroup.name,
    envelopes: envelopeGroup.envelopes.map((x) => x.id),
  };
};
