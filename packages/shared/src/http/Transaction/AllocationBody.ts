import { z } from "zod";

export const AllocationBodySchema = z.object({
  envelopeId: z.string().uuid(),
  amount: z.string().transform(BigInt),
});

export type AllocationBody = z.infer<typeof AllocationBodySchema>;
