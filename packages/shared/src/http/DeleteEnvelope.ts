import { z } from "zod";

export const DeleteEnvelopeParamsSchema = z.object({
  envelopeId: z.string().uuid(),
});
export type DeleteEnvelopeParams = z.infer<typeof DeleteEnvelopeParamsSchema>;
export const DeleteEnvelopeRequestSchema = z.null();
export type DeleteEnvelopeRequest = z.infer<typeof DeleteEnvelopeRequestSchema>;

export const DeleteEnvelopeResponseSchema = z.object({
  id: z.string().uuid(),
});
export type DeleteEnvelopeResponse = z.infer<
  typeof DeleteEnvelopeResponseSchema
>;
