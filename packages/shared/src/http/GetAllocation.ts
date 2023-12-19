import { z } from "zod";
import { AllocationViewSchema } from "../views/AllocationViewSchema.js";

export const GetAllocationParamsSchema = z.object({
  allocationId: z.string().uuid(),
});
export type GetAllocationParams = z.infer<typeof GetAllocationParamsSchema>;

export const GetAllocationRequestSchema = z.null();
export type GetAllocationRequest = z.infer<typeof GetAllocationRequestSchema>;

export const GetAllocationResponseSchema = AllocationViewSchema;
export type GetAllocationResponse = z.infer<typeof GetAllocationResponseSchema>;
export type GetAllocationResponseInput = z.input<
  typeof GetAllocationResponseSchema
>;
