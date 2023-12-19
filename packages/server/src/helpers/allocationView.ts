import { AllocationViewInput } from "@moneymate/shared";
import { Allocation } from "../entities/index.js";

export const allocationView = (a: Allocation): AllocationViewInput => ({
  id: a.id,
  amount: a.amount,
  envelopeId: a.envelopeId,
  envelopeName: a.envelope.name,
});
