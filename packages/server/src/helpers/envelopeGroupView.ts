import { EnvelopeGroupViewInput } from "@moneymate/shared";
import { EnvelopeGroup } from "../entities/index.js";

export const envelopeGroupView = (
  envelopeGroup: EnvelopeGroup
): EnvelopeGroupViewInput => {
  return {
    id: envelopeGroup.id,
    name: envelopeGroup.name,
    isHidden: envelopeGroup.isHidden,
    envelopes: envelopeGroup.envelopes.map((x) => x.id),
  };
};
