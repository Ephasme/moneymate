import { z } from "zod";

export const AccountViewSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  isDefault: z.boolean(),
  reconciledBalance: z.string().transform(BigInt),
  clearedBalance: z.string().transform(BigInt),
  pendingBalance: z.string().transform(BigInt),
});
export type AccountView = z.infer<typeof AccountViewSchema>;
export type AccountViewInput = z.input<typeof AccountViewSchema>;
