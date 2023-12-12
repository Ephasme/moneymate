import { z } from "zod";
import { EnvelopeViewSchema } from "../views/EnvelopeViewSchema";
import { MonthSchema } from "./MonthSchema";

export const GetEnvelopeQuerySchema = z.object({
  currentMonth: MonthSchema.optional(),
});
export type GetEnvelopeQuery = z.infer<typeof GetEnvelopeQuerySchema>;

export const GetEnvelopeParamsSchema = z.object({
  budgetId: z.string().uuid(),
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
