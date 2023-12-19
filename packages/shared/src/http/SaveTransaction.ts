import { z } from "zod";
import { TransactionStatuses } from "../model/index.js";

export const AllocationEditedDeletedSchema = z.object({
  id: z.string(),
  status: z.literal("deleted"),
});
export type AllocationEditedDeleted = z.infer<
  typeof AllocationEditedDeletedSchema
>;
export const AllocationEditedActiveSchema = z.object({
  id: z.string().uuid().optional(),
  status: z.literal("active"),
  envelopeId: z.string().uuid(),
  date: z
    .string()
    .datetime()
    .optional()
    .transform((x) => (x ? new Date(x) : undefined)),
  amount: z.string().transform(BigInt),
});
export type AllocationEditedActive = z.infer<
  typeof AllocationEditedActiveSchema
>;
export const AllocationEditedSchema = z.discriminatedUnion("status", [
  AllocationEditedActiveSchema,
  AllocationEditedDeletedSchema,
]);

export type AllocationEdited = z.infer<typeof AllocationEditedSchema>;
export type AllocationEditedInput = z.input<typeof AllocationEditedSchema>;

export const SaveTransactionRequestSchema = z.object({
  id: z.string().uuid().optional(),
  budgetId: z.string().uuid(),
  accountId: z.string().uuid(),
  description: z.string().optional(),
  amount: z.string().transform(BigInt),
  date: z
    .string()
    .datetime()
    .transform((x) => new Date(x)),
  status: z.enum(TransactionStatuses),
  allocations: AllocationEditedSchema.array(),
});
export type SaveTransactionRequest = z.infer<
  typeof SaveTransactionRequestSchema
>;
export type SaveTransactionRequestInput = z.input<
  typeof SaveTransactionRequestSchema
>;

export const SaveTransactionResponseSchema = z.object({
  id: z.string().uuid(),
});
export type SaveTransactionResponse = z.infer<
  typeof SaveTransactionResponseSchema
>;
export type SaveTransactionResponseInput = z.input<
  typeof SaveTransactionResponseSchema
>;
