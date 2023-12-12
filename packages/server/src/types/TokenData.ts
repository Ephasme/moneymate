import { z } from "zod";

export const tokenDataSchema = z.object({
  email: z.string().email(),
});
export type TokenDataSchema = z.infer<typeof tokenDataSchema>;
