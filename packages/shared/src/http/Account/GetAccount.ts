import { z } from "zod";
import { AccountViewSchema } from "../../views/AccountViewSchema.js";

export const GetAccountParamsSchema = z.object({
  accountId: z.string().uuid(),
});
export type GetAccountParams = z.infer<typeof GetAccountParamsSchema>;

export const GetAccountRequestSchema = z.null();
export type GetAccountRequest = z.infer<typeof GetAccountRequestSchema>;

export const GetAccountResponseSchema = AccountViewSchema;
export type GetAccountResponse = z.infer<typeof GetAccountResponseSchema>;
export type GetAccountResponseInput = z.input<typeof GetAccountResponseSchema>;
