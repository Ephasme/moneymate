import { z } from "zod";
import { TransactionPostedSchema } from "./TransactionPosted.js";

export const PostTransactionsRequestSchema =
  TransactionPostedSchema.array().nonempty();
export type PostTransactionsRequest = z.infer<
  typeof PostTransactionsRequestSchema
>;
export type PostTransactionsRequestInput = z.input<
  typeof PostTransactionsRequestSchema
>;

export const PostTransactionsResponseSchema = z.null();
export type PostTransactionsResponse = z.infer<
  typeof PostTransactionsResponseSchema
>;
export type PostTransactionsResponseInput = z.input<
  typeof PostTransactionsResponseSchema
>;
