import { z } from "zod";
import { TransactionStatuses } from "../model";

export const SaveTransactionStatusParamsSchema = z.object({
  id: z.string().uuid(),
});
export type SaveTransactionStatusParams = z.infer<
  typeof SaveTransactionStatusParamsSchema
>;

export const SaveTransactionStatusRequestSchema = z.object({
  status: z.enum(TransactionStatuses),
});
export type SaveTransactionStatusRequest = z.infer<
  typeof SaveTransactionStatusRequestSchema
>;

export const SaveTransactionStatusResponseSchema = z.object({
  id: z.string().uuid(),
});
export type SaveTransactionStatusResponse = z.infer<
  typeof SaveTransactionStatusResponseSchema
>;
