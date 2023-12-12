import { AllocationViewInput } from "@moneymate/shared";
import { Allocation } from "../entities";

export const allocationView = (a: Allocation): AllocationViewInput => ({
  id: a.id,
  amount: a.amount,
  envelopeId: a.envelopeId,
  envelopeName: a.envelope.name,
});
