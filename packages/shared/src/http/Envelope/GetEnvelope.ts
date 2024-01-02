import { z } from "zod";
import { EnvelopeViewSchema } from "../../views/EnvelopeViewSchema.js";
import { MonthSchema } from "../MonthSchema.js";

export const GetEnvelopeQuerySchema = z.object({
  currentMonth: MonthSchema.optional(),
});
export type GetEnvelopeQuery = z.infer<typeof GetEnvelopeQuerySchema>;

export const GetEnvelopeParamsSchema = z.object({
  envelopeId: z.string().uuid(),
});
export type GetEnvelopeParams = z.infer<typeof GetEnvelopeParamsSchema>;

export const GetEnvelopeRequestSchema = z.null();
export type GetEnvelopeRequest = z.infer<typeof GetEnvelopeRequestSchema>;

export const GetEnvelopeResponseSchema = EnvelopeViewSchema;
export type GetEnvelopeResponse = z.infer<typeof GetEnvelopeResponseSchema>;
export type GetEnvelopeResponseInput = z.input<
  typeof GetEnvelopeResponseSchema
>;
