import { z } from "zod";

export const DeleteTransactionsRequestSchema = z
  .object({ id: z.string().uuid() })
  .array();

export type DeleteTransactionsRequest = z.infer<
  typeof DeleteTransactionsRequestSchema
>;

export const DeleteTransactionsResponseSchema = z.null();
export type DeleteTransactionsResponse = z.infer<
  typeof DeleteTransactionsResponseSchema
>;
