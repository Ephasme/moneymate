import { z } from "zod";

export const TransferPostedSchema = z.object({
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

export type TransferPosted = z.infer<typeof TransferPostedSchema>;
export type TransferPostedInput = z.input<typeof TransferPostedSchema>;
