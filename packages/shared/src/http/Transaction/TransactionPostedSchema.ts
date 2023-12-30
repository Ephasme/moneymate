import { z } from "zod";
import { TransactionStatuses } from "../../model/index.js";
import { RecurrenceViewSchema } from "../../views/RecurrenceViewSchema.js";
import { AllocationPostedSchema } from "./AllocationPostedSchema.js";

export const TransactionPostedSchema = z.object({
  id: z.string().uuid().optional(),
  budgetId: z.string().uuid(),
  accountId: z.string().uuid(),
  description: z.string().optional(),
  amount: z.string().transform(BigInt),
  recurrence: RecurrenceViewSchema.optional(),
  date: z
    .string()
    .datetime()
    .transform((x) => new Date(x)),
  status: z.enum(TransactionStatuses).default("pending"),
  allocations: AllocationPostedSchema.array().default([]),
});

export type TransactionPosted = z.infer<typeof TransactionPostedSchema>;
export type TransactionPostedInput = z.input<typeof TransactionPostedSchema>;
