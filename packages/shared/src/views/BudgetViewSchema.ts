import { z } from "zod";

export const BudgetViewSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  unallocatedAmount: z.string().transform(BigInt),
});
export type BudgetView = z.infer<typeof BudgetViewSchema>;
export type BudgetViewInput = z.input<typeof BudgetViewSchema>;
