import { z } from "zod";

export const EditEnvelopeGroupParamsSchema = z.object({
  envelopeGroupId: z.string().uuid(),
});
export type EditEnvelopeGroupParams = z.infer<
  typeof EditEnvelopeGroupParamsSchema
>;

export const EditEnvelopeGroupRequestSchema = z.object({
  name: z.string().optional(),
  hidden: z.boolean().optional(),
});
export type EditEnvelopeGroupRequest = z.infer<
  typeof EditEnvelopeGroupRequestSchema
>;

export const EditEnvelopeGroupResponseSchema = z.object({
  id: z.string().uuid(),
});
export type EditEnvelopeGroupResponse = z.infer<
  typeof EditEnvelopeGroupResponseSchema
>;
