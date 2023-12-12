import { z } from "zod";
import { AccountViewSchema } from "../views/AccountViewSchema";

export const GetAccountsParamsSchema = z.object({
  budgetId: z.string().uuid(),
});
export type GetAccountsParams = z.infer<typeof GetAccountsParamsSchema>;

export const GetAccountsRequestSchema = z.null();
export type GetAccountsRequest = z.infer<typeof GetAccountsRequestSchema>;

export const GetAccountsResponseSchema = AccountViewSchema.array();
export type GetAccountsResponse = z.infer<typeof GetAccountsResponseSchema>;
export type GetAccountsResponseInput = z.input<
  typeof GetAccountsResponseSchema
>;
