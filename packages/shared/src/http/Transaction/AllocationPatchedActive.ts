import { z } from "zod";

export const AllocationPatchedActiveSchema = z.object({
  id: z.string().uuid(),
  status: z.literal("active"),
  envelopeId: z.string().uuid().optional(),
  date: z
    .string()
    .datetime()
    .transform((x) => (x ? new Date(x) : undefined))
    .optional(),
  amount: z.string().transform(BigInt).optional(),
});
export type AllocationPatchedActive = z.infer<
  typeof AllocationPatchedActiveSchema
>;
