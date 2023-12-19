import { z } from "zod";
import { TransactionViewSchema } from "../views/TransactionViewSchema.js";

export const GetTransactionParamsSchema = z.object({
  transactionId: z.string().uuid(),
});
export type GetTransactionParams = z.infer<typeof GetTransactionParamsSchema>;

export const GetTransactionRequestSchema = z.null();
export type GetTransactionRequest = z.infer<typeof GetTransactionRequestSchema>;

export const GetTransactionResponseSchema = TransactionViewSchema;
export type GetTransactionResponse = z.infer<
  typeof GetTransactionResponseSchema
>;
export type GetTransactionResponseInput = z.input<
  typeof GetTransactionResponseSchema
>;
