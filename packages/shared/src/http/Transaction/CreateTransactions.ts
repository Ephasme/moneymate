import { z } from "zod";
import { TransactionStatuses } from "../../model/index.js";

export const AllocationPostedSchema = z.object({
  id: z.string().uuid().optional(),
  envelopeId: z.string().uuid(),
  date: z
    .string()
    .datetime()
    .optional()
    .transform((x) => (x ? new Date(x) : undefined)),
  amount: z.string().transform(BigInt),
});

export type AllocationPosted = z.infer<typeof AllocationPostedSchema>;
export type AllocationPostedInput = z.input<typeof AllocationPostedSchema>;

export const CreateTransactionsRequestSchema = z
  .object({
    id: z.string().uuid().optional(),
    budgetId: z.string().uuid(),
    accountId: z.string().uuid(),
    description: z.string().optional(),
    amount: z.string().transform(BigInt),
    date: z
      .string()
      .datetime()
      .transform((x) => new Date(x)),
    status: z.enum(TransactionStatuses).default("pending"),
    allocations: AllocationPostedSchema.array().default([]),
  })
  .array()
  .nonempty();
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
