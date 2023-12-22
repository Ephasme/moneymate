import { z } from "zod";

export const SignUpRequestSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  password: z.string(),
  passwordConfirmation: z.string(),
});
export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;

export const SignUpResponseSchema = z.object({
  id: z.string().uuid(),
  token: z.string(),
});
export type SignUpResponse = z.infer<typeof SignUpResponseSchema>;
