import { z } from "zod";
import { TransactionPutSchema } from "./TransactionPut.js";

export const PutTransactionsRequestSchema =
  TransactionPutSchema.array().nonempty();
export type PutTransactionsRequest = z.infer<
  typeof PutTransactionsRequestSchema
>;
export type PutTransactionsRequestInput = z.input<
  typeof PutTransactionsRequestSchema
>;

export const PutTransactionsResponseSchema = z.null();
export type PutTransactionsResponse = z.infer<
  typeof PutTransactionsResponseSchema
>;
export type PutTransactionsResponseInput = z.input<
  typeof PutTransactionsResponseSchema
>;
