import { z } from "zod";

export const AllocationPostedSchema = z.object({
  id: z.string().uuid().optional(),
  envelopeId: z.string().uuid(),
  date: z
    .string()
    .datetime()
    .optional()
    .transform((x) => (x ? new Date(x) : undefined)),
  amount: z.string().transform(BigInt),
});
