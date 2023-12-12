import { z } from "zod";

export const SaveEnvelopeGroupRequestSchema = z.object({
  id: z.string().uuid().optional(),
  budgetId: z.string().uuid(),
  name: z.string(),
});
export type SaveEnvelopeGroupRequest = z.infer<
  typeof SaveEnvelopeGroupRequestSchema
>;
export type SaveEnvelopeGroupRequestInput = z.input<
  typeof SaveEnvelopeGroupRequestSchema
>;

export const SaveEnvelopeGroupResponseSchema = z.object({
  id: z.string().uuid(),
});
export type SaveEnvelopeGroupResponse = z.infer<
  typeof SaveEnvelopeGroupResponseSchema
>;
export type SaveEnvelopeGroupResponseInput = z.input<
  typeof SaveEnvelopeGroupResponseSchema
>;
