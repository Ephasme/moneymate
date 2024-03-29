import { z } from "zod";
import { TransactionStatuses } from "../../model/index.js";
import { RecurrenceViewSchema } from "../../views/RecurrenceViewSchema.js";
import { AllocationBodySchema } from "./AllocationBody.js";

export const TransactionCommonSchema = z.object({
  budgetId: z.string().uuid(),
  accountId: z.string().uuid().nullish(),
  description: z.string().nullish(),
  amount: z.string().transform(BigInt),
  payee: z.string().nullish(),
  recurrence: RecurrenceViewSchema.nullish(),
  date: z
    .string()
    .datetime()
    .transform((x) => new Date(x)),
  status: z.enum(TransactionStatuses).default("pending"),
  allocations: AllocationBodySchema.array().default([]),
});
