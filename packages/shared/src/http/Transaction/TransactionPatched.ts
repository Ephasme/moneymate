import { z } from "zod";
import { TransactionStatuses } from "../../model/index.js";
import { AllocationPatchedSchema } from "./AllocationPatched.js";
import { RecurrenceViewSchema } from "../../views/RecurrenceViewSchema.js";

export const TransactionPatchedSchema = z.object({
  id: z.string().uuid(),
  budgetId: z.string().uuid().optional(),
  accountId: z.string().uuid().optional(),
  description: z.string().optional().nullable(),
  recurrence: RecurrenceViewSchema.optional(),
  amount: z.string().transform(BigInt).optional(),
  date: z
    .string()
    .datetime()
    .transform((x) => new Date(x))
    .optional(),
  status: z.enum(TransactionStatuses).optional(),
  allocations: AllocationPatchedSchema.array().optional(),
});

export type TransactionPatched = z.infer<typeof TransactionPatchedSchema>;
export type TransactionPatchedInput = z.input<typeof TransactionPatchedSchema>;
