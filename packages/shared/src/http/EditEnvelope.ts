import { z } from "zod";
import { EnvelopeViewSchema } from "../views/EnvelopeViewSchema.js";

export const EditEnvelopeParamsSchema = z.object({
  envelopeId: z.string().uuid(),
});
export type EditEnvelopeParams = z.infer<typeof EditEnvelopeParamsSchema>;

export const EditEnvelopeRequestSchema = z.object({
  name: z.string().optional(),
  hidden: z.boolean().optional(),
});
export type EditEnvelopeRequest = z.infer<typeof EditEnvelopeRequestSchema>;

export const EditEnvelopeResponseSchema = z.object({
  id: z.string().uuid(),
});
export type EditEnvelopeResponse = z.infer<typeof EditEnvelopeResponseSchema>;
