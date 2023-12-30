import { z } from "zod";
import { AllocationPostedSchema } from "./AllocationPostedSchema.js";
import { TransactionPostedSchema } from "./TransactionPostedSchema.js";

export type AllocationPosted = z.infer<typeof AllocationPostedSchema>;
export type AllocationPostedInput = z.input<typeof AllocationPostedSchema>;

export const CreateTransactionsRequestSchema =
  TransactionPostedSchema.array().nonempty();
export type CreateTransactionsRequest = z.infer<
  typeof CreateTransactionsRequestSchema
>;
export type CreateTransactionsRequestInput = z.input<
  typeof CreateTransactionsRequestSchema
>;

export const CreateTransactionsResponseSchema = z.null();
export type CreateTransactionsResponse = z.infer<
  typeof CreateTransactionsResponseSchema
>;
export type CreateTransactionsResponseInput = z.input<
  typeof CreateTransactionsResponseSchema
>;
