import { z } from "zod";
import { patchOption } from "../../helpers/index.js";
import { TransactionStatuses } from "../../model/index.js";
import { RecurrenceViewSchema } from "../../views/RecurrenceViewSchema.js";
import { AllocationBodySchema } from "./AllocationBody.js";

export const TransactionPatchedSchema = z.object({
  id: z.string().uuid(),
  budgetId: z.string().uuid().optional(),
  accountId: z.string().uuid().optional(),
  description: patchOption(z.string()),
  amount: z.string().transform(BigInt).optional(),
  payee: patchOption(z.string()),
  recurrence: patchOption(RecurrenceViewSchema.optional()),
  date: z
    .string()
    .datetime()
    .transform((x) => new Date(x))
    .optional(),
  status: z.enum(TransactionStatuses).default("pending").optional(),
  allocations: AllocationBodySchema.array().default([]).optional(),
});

export type TransactionPatched = z.infer<typeof TransactionPatchedSchema>;
export type TransactionPatchedInput = z.input<typeof TransactionPatchedSchema>;
