import { z } from "zod";
import { EnvelopeGroupViewSchema } from "../views/EnvelopeGroupViewSchema";
import { MonthSchema } from "./MonthSchema";

export const GetEnvelopeGroupQuerySchema = z.object({
  currentMonth: MonthSchema.optional(),
});
export type GetEnvelopeGroupQuery = z.infer<typeof GetEnvelopeGroupQuerySchema>;

export const GetEnvelopeGroupParamsSchema = z.object({
  budgetId: z.string().uuid(),
  envelopeGroupId: z.string().uuid(),
});
export type GetEnvelopeGroupParams = z.infer<
  typeof GetEnvelopeGroupParamsSchema
>;

export const GetEnvelopeGroupRequestSchema = z.null();
export type GetEnvelopeGroupRequest = z.infer<
  typeof GetEnvelopeGroupRequestSchema
>;

export const GetEnvelopeGroupResponseSchema = EnvelopeGroupViewSchema;
export type GetEnvelopeGroupResponse = z.infer<
  typeof GetEnvelopeGroupResponseSchema
>;
export type GetEnvelopeGroupResponseInput = z.input<
  typeof GetEnvelopeGroupResponseSchema
>;
