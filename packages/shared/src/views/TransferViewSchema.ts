import { z } from "zod";

export const TransferViewSchema = z.object({
  id: z.string().uuid(),
  amount: z.string().transform(BigInt),
  date: z
    .string()
    .datetime()
    .transform((date) => new Date(date)),
});

export type TransferView = z.infer<typeof TransferViewSchema>;
export type TransferViewInput = z.input<typeof TransferViewSchema>;
