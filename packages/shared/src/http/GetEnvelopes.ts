import { z } from "zod";
import { EnvelopeViewSchema } from "../views/EnvelopeViewSchema";
import { MonthSchema } from "./MonthSchema";

export const GetEnvelopesQuerySchema = z.object({
  currentMonth: MonthSchema.optional(),
});

export const GetEnvelopesParamsSchema = z.object({
  budgetId: z.string().uuid(),
});
export type GetEnvelopesParams = z.infer<typeof GetEnvelopesParamsSchema>;

export const GetEnvelopesRequestSchema = z.null();
export type GetEnvelopesRequest = z.infer<typeof GetEnvelopesRequestSchema>;

export const GetEnvelopesResponseSchema = EnvelopeViewSchema.array();
export type GetEnvelopesResponse = z.infer<typeof GetEnvelopesResponseSchema>;
export type GetEnvelopesResponseInput = z.input<
  typeof GetEnvelopesResponseSchema
>;
