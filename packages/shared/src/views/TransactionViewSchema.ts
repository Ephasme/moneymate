import { z } from "zod";
import { AllocationViewSchema } from "./AllocationViewSchema.js";
import { TransactionStatuses } from "../model/index.js";
import { RecurrenceViewSchema } from "./RecurrenceViewSchema.js";

export const TransactionViewSchema = z.object({
  id: z.string().uuid(),
  accountName: z.string(),
  accountId: z.string().uuid(),
  description: z.string().nullish(),
  status: z.enum(TransactionStatuses),
  amount: z.string().transform(BigInt),
  date: z.string().datetime(),
  payee: z.string().nullish(),
  allocations: AllocationViewSchema.array(),
  recurrence: RecurrenceViewSchema.nullish(),
  fullyAllocated: z.boolean(),
  unallocatedAmount: z.string().transform(BigInt),
});
export type TransactionView = z.infer<typeof TransactionViewSchema>;
export type TransactionViewInput = z.input<typeof TransactionViewSchema>;
