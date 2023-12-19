import { z } from "zod";

export const DeleteEnvelopeGroupParamsSchema = z.object({
  envelopeGroupId: z.string().uuid(),
});
export type DeleteEnvelopeGroupParams = z.infer<
  typeof DeleteEnvelopeGroupParamsSchema
>;
export const DeleteEnvelopeGroupRequestSchema = z.null();
export type DeleteEnvelopeGroupRequest = z.infer<
  typeof DeleteEnvelopeGroupRequestSchema
>;

export const DeleteEnvelopeGroupResponseSchema = z.object({
  id: z.string().uuid(),
});
export type DeleteEnvelopeGroupResponse = z.infer<
  typeof DeleteEnvelopeGroupResponseSchema
>;
