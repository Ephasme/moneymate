import { z } from "zod";
import { BudgetViewSchema } from "../views/BudgetViewSchema.js";

export const GetBudgetsRequestSchema = z.null();
export type GetBudgetsRequest = z.infer<typeof GetBudgetsRequestSchema>;

export const GetBudgetsResponseSchema = BudgetViewSchema.array();
export type GetBudgetsResponse = z.infer<typeof GetBudgetsResponseSchema>;
export type GetBudgetsResponseInput = z.input<typeof GetBudgetsResponseSchema>;
