import { z } from "zod";
import { EnvelopePatchedSchema } from "./EnvelopePatched.js";

export const PatchEnvelopesRequestSchema = EnvelopePatchedSchema.array();
export type PatchEnvelopesRequest = z.infer<typeof PatchEnvelopesRequestSchema>;
export type PatchEnvelopesRequestInput = z.input<
  typeof PatchEnvelopesRequestSchema
>;

export const PatchEnvelopesResponseSchema = z.null();
export type PatchEnvelopesResponse = z.infer<
  typeof PatchEnvelopesResponseSchema
>;
export type PatchEnvelopesResponseInput = z.input<
  typeof PatchEnvelopesResponseSchema
>;
