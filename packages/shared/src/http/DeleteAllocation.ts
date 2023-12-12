import { z } from "zod";

export const DeleteAllocationParamsSchema = z.object({
  allocationId: z.string().uuid(),
});
export type DeleteAllocationParams = z.infer<
  typeof DeleteAllocationParamsSchema
>;
export const DeleteAllocationRequestSchema = z.null();
export type DeleteAllocationRequest = z.infer<
  typeof DeleteAllocationRequestSchema
>;

export const DeleteAllocationResponseSchema = z.object({
  id: z.string().uuid(),
});
export type DeleteAllocationResponse = z.infer<
  typeof DeleteAllocationResponseSchema
>;
