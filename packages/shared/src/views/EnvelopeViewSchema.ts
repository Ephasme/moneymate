import { z } from "zod";
import { TransferViewSchema } from "./TransferViewSchema.js";

export const EnvelopeViewSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  isHidden: z.boolean(),
  isDefault: z.boolean(),
  allocations: z
    .object({
      id: z.string().uuid(),
      amount: z.string().transform(BigInt),
    })
    .array(),
  fromTransfers: TransferViewSchema.array(),
  toTransfers: TransferViewSchema.array(),
  balance: z.string().transform(BigInt),
  allocated: z.string().transform(BigInt),
  activity: z.string().transform(BigInt),
  parentId: z.string().uuid(),
});
export type EnvelopeView = z.infer<typeof EnvelopeViewSchema>;
export type EnvelopeViewInput = z.input<typeof EnvelopeViewSchema>;
