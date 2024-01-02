import { z } from "zod";
import { TransferPostedSchema } from "./TransferPosted.js";

export const PostTransfersRequestSchema =
  TransferPostedSchema.array().nonempty();
export type PostTransfersRequest = z.infer<typeof PostTransfersRequestSchema>;
export type PostTransfersRequestInput = z.input<
  typeof PostTransfersRequestSchema
>;

export const PostTransfersResponseSchema = z.null();
export type PostTransfersResponse = z.infer<typeof PostTransfersResponseSchema>;
export type PostTransfersResponseInput = z.input<
  typeof PostTransfersResponseSchema
>;
