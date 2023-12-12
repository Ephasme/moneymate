import { z } from "zod";

export const AllocationViewSchema = z.object({
  id: z.string().uuid(),
  amount: z.string().transform(BigInt),
  envelopeId: z.string().uuid(),
  envelopeName: z.string(),
});

export type AllocationView = z.infer<typeof AllocationViewSchema>;
export type AllocationViewInput = z.input<typeof AllocationViewSchema>;
