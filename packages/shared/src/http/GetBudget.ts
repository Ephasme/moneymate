import { z } from "zod";
import { BudgetViewSchema } from "../views/BudgetViewSchema";
import { MonthSchema } from "./MonthSchema";

export const GetBudgetQuerySchema = z.object({
  currentMonth: MonthSchema.optional(),
});
export type GetBudgetQuery = z.infer<typeof GetBudgetQuerySchema>;

export const GetBudgetParamsSchema = z.object({ budgetId: z.string().uuid() });
export type GetBudgetParams = z.infer<typeof GetBudgetParamsSchema>;

export const GetBudgetResponseSchema = BudgetViewSchema;
export type GetBudgetResponse = z.infer<typeof GetBudgetResponseSchema>;
export type GetBudgetResponseInput = z.input<typeof GetBudgetResponseSchema>;
