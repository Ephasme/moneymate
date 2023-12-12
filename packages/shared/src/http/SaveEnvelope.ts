import { z } from "zod";

export const SaveEnvelopeRequestSchema = z.object({
  id: z.string().uuid().optional(),
  budgetId: z.string().uuid(),
  parentId: z.string().uuid().optional(),
  name: z.string(),
});
export type SaveEnvelopeRequest = z.infer<typeof SaveEnvelopeRequestSchema>;
export type SaveEnvelopeRequestInput = z.input<
  typeof SaveEnvelopeRequestSchema
>;

export const SaveEnvelopeResponseSchema = z.object({
  id: z.string().uuid(),
});
export type SaveEnvelopeResponse = z.infer<typeof SaveEnvelopeResponseSchema>;
export type SaveEnvelopeResponseInput = z.input<
  typeof SaveEnvelopeResponseSchema
>;
