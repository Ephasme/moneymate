import { z } from "zod";
import { EnvelopeGroupViewSchema } from "../views/EnvelopeGroupViewSchema";
import { MonthSchema } from "./MonthSchema";

export const GetEnvelopeGroupsQuerySchema = z.object({
  currentMonth: MonthSchema.optional(),
});
export type GetEnvelopeGroupsQuery = z.infer<
  typeof GetEnvelopeGroupsQuerySchema
>;

export const GetEnvelopeGroupsParamsSchema = z.object({
  budgetId: z.string().uuid(),
  envelopeId: z.string().uuid(),
});
export type GetEnvelopeGroupsParams = z.infer<
  typeof GetEnvelopeGroupsParamsSchema
>;

export const GetEnvelopeGroupsRequestSchema = z.null();
export type GetEnvelopeGroupsRequest = z.infer<
  typeof GetEnvelopeGroupsRequestSchema
>;

export const GetEnvelopeGroupsResponseSchema = EnvelopeGroupViewSchema.array();
export type GetEnvelopeGroupsResponse = z.infer<
  typeof GetEnvelopeGroupsResponseSchema
>;
export type GetEnvelopeGroupsResponseInput = z.input<
  typeof GetEnvelopeGroupsResponseSchema
>;
