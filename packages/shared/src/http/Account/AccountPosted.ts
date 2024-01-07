import { z } from "zod";

export const AccountPostedSchema = z.object({
  id: z.string().uuid().optional(),
  budgetId: z.string().uuid(),
  name: z.string(),
});

export type AccountPosted = z.infer<typeof AccountPostedSchema>;
export type AccountPostedInput = z.input<typeof AccountPostedSchema>;
