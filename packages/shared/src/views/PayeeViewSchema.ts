import { z } from "zod";

export const PayeeViewSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});
export type PayeeView = z.infer<typeof PayeeViewSchema>;
export type PayeeViewInput = z.input<typeof PayeeViewSchema>;
