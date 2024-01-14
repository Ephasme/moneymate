import { z } from "zod";
import { TransactionCommonSchema } from "./TransactionCommonSchema.js";

export const TransactionPutSchema = z
  .object({ id: z.string().uuid() })
  .merge(TransactionCommonSchema);

export type TransactionPut = z.infer<typeof TransactionPutSchema>;
export type TransactionPutInput = z.input<typeof TransactionPutSchema>;
