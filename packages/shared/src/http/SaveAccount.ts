import { z } from "zod";

export const SaveAccountRequestSchema = z.object({
  id: z.string().uuid().optional(),
  budgetId: z.string().uuid(),
  name: z.string(),
});
export type SaveAccountRequest = z.infer<typeof SaveAccountRequestSchema>;

export const SaveAccountResponseSchema = z.object({
  id: z.string().uuid(),
});
export type SaveAccountResponse = z.infer<typeof SaveAccountResponseSchema>;
