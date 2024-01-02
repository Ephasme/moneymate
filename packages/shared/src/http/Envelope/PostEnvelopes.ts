import { z } from "zod";
import { EnvelopePostedSchema } from "./EnvelopePosted.js";

export const PostEnvelopesRequestSchema =
  EnvelopePostedSchema.array().nonempty();
export type PostEnvelopesRequest = z.infer<typeof PostEnvelopesRequestSchema>;
export type PostEnvelopesRequestInput = z.input<
  typeof PostEnvelopesRequestSchema
>;

export const PostEnvelopesResponseSchema = z.null();
export type PostEnvelopesResponse = z.infer<typeof PostEnvelopesResponseSchema>;
export type PostEnvelopesResponseInput = z.input<
  typeof PostEnvelopesResponseSchema
>;
