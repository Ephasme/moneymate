import { z } from "zod";

export const AccountViewSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),

  clearedBalance: z.string().transform(BigInt),
  pendingBalance: z.string().transform(BigInt),
});
export type AccountView = z.infer<typeof AccountViewSchema>;
export type AccountViewInput = z.input<typeof AccountViewSchema>;
