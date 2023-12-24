import { z } from "zod";
import { TransactionPatchedSchema } from "./TransactionPatched.js";

export const PatchTransactionsRequestSchema = TransactionPatchedSchema.array();
export type PatchTransactionsRequest = z.infer<
  typeof PatchTransactionsRequestSchema
>;
export type PatchTransactionsRequestInput = z.input<
  typeof PatchTransactionsRequestSchema
>;

export const PatchTransactionsResponseSchema = z.null();
export type PatchTransactionsResponse = z.infer<
  typeof PatchTransactionsResponseSchema
>;
export type PatchTransactionsResponseInput = z.input<
  typeof PatchTransactionsResponseSchema
>;
