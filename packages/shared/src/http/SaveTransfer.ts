import { z } from "zod";

export const SaveTransferRequestSchema = z.object({
  id: z.string().uuid().optional(),
  date: z
    .string()
    .datetime()
    .transform((date) => new Date(date)),
  budgetId: z.string().uuid(),
  fromEnvelopeId: z.string().uuid(),
  toEnvelopeId: z.string().uuid(),
  amount: z.string().transform(BigInt),
});
export type SaveTransferRequest = z.infer<typeof SaveTransferRequestSchema>;
export type SaveTransferRequestInput = z.input<
  typeof SaveTransferRequestSchema
>;

export const SaveTransferResponseSchema = z.object({
  id: z.string().uuid(),
});
export type SaveTransferResponse = z.infer<typeof SaveTransferResponseSchema>;
export type SaveTransferResponseInput = z.input<
  typeof SaveTransferResponseSchema
>;
