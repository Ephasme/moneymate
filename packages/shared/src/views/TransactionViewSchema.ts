import { z } from "zod";
import { AllocationViewSchema } from "./AllocationViewSchema";
import { TransactionStatuses } from "../model";

export const TransactionViewSchema = z.object({
  id: z.string().uuid(),
  accountName: z.string(),
  accountId: z.string().uuid(),
  description: z.string().optional(),
  status: z.enum(TransactionStatuses),
  amount: z.string().transform(BigInt),
  date: z.string().datetime(),
  payee: z.string().optional(),
  allocations: AllocationViewSchema.array(),
  fullyAllocated: z.boolean(),
  unallocatedAmount: z.string().transform(BigInt),
});
export type TransactionView = z.infer<typeof TransactionViewSchema>;
export type TransactionViewInput = z.input<typeof TransactionViewSchema>;
