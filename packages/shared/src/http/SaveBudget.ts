import { z } from "zod";

export const SaveBudgetRequestSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
});
export type SaveBudgetRequest = z.infer<typeof SaveBudgetRequestSchema>;

export const SaveBudgetResponseSchema = z.object({
  id: z.string().uuid(),
});
export type SaveBudgetResponse = z.infer<typeof SaveBudgetResponseSchema>;
