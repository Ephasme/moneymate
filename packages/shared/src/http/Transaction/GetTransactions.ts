import { z } from "zod";
import { TransactionViewSchema } from "../../views/TransactionViewSchema.js";

export const GetTransactionsParamsSchema = z.object({
  budgetId: z.string().uuid(),
  accountId: z.string().uuid(),
});
export type GetTransactionsParams = z.infer<typeof GetTransactionsParamsSchema>;

export const GetTransactionsRequestSchema = z.null();
export type GetTransactionsRequest = z.infer<
  typeof GetTransactionsRequestSchema
>;

export const GetTransactionsResponseSchema = TransactionViewSchema.array();
export type GetTransactionsResponse = z.infer<
  typeof GetTransactionsResponseSchema
>;
export type GetTransactionsResponseInput = z.input<
  typeof GetTransactionsResponseSchema
>;
