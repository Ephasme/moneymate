import { z } from "zod";
import { TransactionStatuses } from "../../model/index.js";
import { RecurrenceViewSchema } from "../../views/RecurrenceViewSchema.js";
import { AllocationBodySchema } from "./AllocationBody.js";

export const TransactionPostedSchema = z.object({
  id: z.string().uuid().optional(),
  budgetId: z.string().uuid(),
  accountId: z.string().uuid(),
  description: z.string().optional(),
  amount: z.string().transform(BigInt),
  payee: z.string().nullish(),
  recurrence: RecurrenceViewSchema.optional(),
  date: z
    .string()
    .datetime()
    .transform((x) => new Date(x)),
  status: z.enum(TransactionStatuses).default("pending"),
  allocations: AllocationBodySchema.array().default([]),
});

export type TransactionPosted = z.infer<typeof TransactionPostedSchema>;
export type TransactionPostedInput = z.input<typeof TransactionPostedSchema>;
