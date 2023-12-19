import { z } from "zod";

export const EnvelopeGroupViewSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  isHidden: z.boolean(),
  envelopes: z.array(z.string().uuid()),
});
export type EnvelopeGroupView = z.infer<typeof EnvelopeGroupViewSchema>;
export type EnvelopeGroupViewInput = z.input<typeof EnvelopeGroupViewSchema>;
