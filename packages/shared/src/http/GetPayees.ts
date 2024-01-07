import { z } from "zod";
import { PayeeViewSchema } from "../views/PayeeViewSchema.js";

export const GetPayeesParamsSchema = z.object({ budgetId: z.string().uuid() });
export type GetPayeesParams = z.infer<typeof GetPayeesParamsSchema>;

export const GetPayeesResponseSchema = PayeeViewSchema.array();
export type GetPayeesResponse = z.infer<typeof GetPayeesResponseSchema>;
export type GetPayeesResponseInput = z.input<typeof GetPayeesResponseSchema>;
