import { z } from "zod";

export const DeleteTransactionParamsSchema = z.object({
  transactionId: z.string().uuid(),
});
export type DeleteTransactionParams = z.infer<
  typeof DeleteTransactionParamsSchema
>;
export const DeleteTransactionRequestSchema = z.null();
export type DeleteTransactionRequest = z.infer<
  typeof DeleteTransactionRequestSchema
>;

export const DeleteTransactionResponseSchema = z.object({
  id: z.string().uuid(),
});
export type DeleteTransactionResponse = z.infer<
  typeof DeleteTransactionResponseSchema
>;
