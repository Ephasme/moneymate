import { z } from "zod";

export const EnvelopePostedSchema = z.object({
  id: z.string().uuid(),
  budgetId: z.string().uuid(),
  parentId: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional(),
  emoji: z.string().optional(),
  hidden: z.boolean().optional(),
});

export type EnvelopePosted = z.infer<typeof EnvelopePostedSchema>;
export type EnvelopePostedInput = z.input<typeof EnvelopePostedSchema>;
