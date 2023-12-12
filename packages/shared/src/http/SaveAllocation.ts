import { z } from "zod";

export const SaveAllocationRequestSchema = z.object({
  id: z.string().uuid().optional(),
  budgetId: z.string().uuid(),
  transactionId: z.string().uuid(),
  envelopeId: z.string().uuid(),
  amount: z.string().transform(BigInt),
  date: z
    .string()
    .datetime()
    .optional()
    .transform((x) => (x ? new Date(x) : undefined)),
});
export type SaveAllocationRequest = z.infer<typeof SaveAllocationRequestSchema>;
export type SaveAllocationRequestInput = z.input<
  typeof SaveAllocationRequestSchema
>;

export const SaveAllocationResponseSchema = z.object({
  id: z.string().uuid(),
});
export type SaveAllocationResponse = z.infer<
  typeof SaveAllocationResponseSchema
>;
