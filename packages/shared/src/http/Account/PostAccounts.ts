import { z } from "zod";
import { AccountPostedSchema } from "./AccountPosted.js";

export const PostAccountsRequestSchema = AccountPostedSchema.array().nonempty();
export type PostAccountsRequest = z.infer<typeof PostAccountsRequestSchema>;
export type PostAccountsRequestInput = z.input<
  typeof PostAccountsRequestSchema
>;

export const PostAccountsResponseSchema = z.null();
export type PostAccountsResponse = z.infer<typeof PostAccountsResponseSchema>;
export type PostAccountsResponseInput = z.input<
  typeof PostAccountsResponseSchema
>;
