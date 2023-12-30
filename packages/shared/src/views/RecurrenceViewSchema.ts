import { z } from "zod";
import { RecurrencePeriod } from "../model/index.js";

export const RecurrenceViewSchema = z.object({
  id: z.string(),
  period: z.enum(RecurrencePeriod),
  frequency: z.number(),
  startDate: z.string().transform((x) => new Date(x)),
  currentDate: z.string().transform((x) => new Date(x)),
});
export type RecurrenceView = z.infer<typeof RecurrenceViewSchema>;
export type RecurrenceViewInput = z.input<typeof RecurrenceViewSchema>;
