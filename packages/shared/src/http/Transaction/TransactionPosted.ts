import { z } from "zod";
import { TransactionCommonSchema } from "./TransactionCommonSchema.js";

export const TransactionPostedSchema = z
  .object({ id: z.string().uuid().optional() })
  .merge(TransactionCommonSchema);

export type TransactionPosted = z.infer<typeof TransactionPostedSchema>;
export type TransactionPostedInput = z.input<typeof TransactionPostedSchema>;
