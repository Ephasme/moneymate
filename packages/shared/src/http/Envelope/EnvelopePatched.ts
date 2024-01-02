import { z } from "zod";
import { patchOption } from "../../helpers/index.js";

export const EnvelopePatchedSchema = z.object({
  id: z.string().uuid(),
  budgetId: z.string().uuid().optional(),
  parentId: patchOption(z.string().uuid()),
  name: z.string().optional(),
  description: patchOption(z.string()),
  emoji: patchOption(z.string()),
  hidden: patchOption(z.boolean()),
});

export type EnvelopePatched = z.infer<typeof EnvelopePatchedSchema>;
export type EnvelopePatchedInput = z.input<typeof EnvelopePatchedSchema>;
