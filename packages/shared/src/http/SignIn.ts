import { z } from "zod";

export const SignInRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type SignInRequest = z.infer<typeof SignInRequestSchema>;

export const SignInResponseSchema = z.object({
  token: z.string(),
});
export type SignInResponse = z.infer<typeof SignInResponseSchema>;
