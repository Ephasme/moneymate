import { z } from "zod";
import { AllocationPatchedDeletedSchema } from "./AllocationPatchedDeleted.js";
import { AllocationPatchedActiveSchema } from "./AllocationPatchedActive.js";

export const AllocationPatchedSchema = z.discriminatedUnion("status", [
  AllocationPatchedActiveSchema,
  AllocationPatchedDeletedSchema,
]);

export type AllocationPatched = z.infer<typeof AllocationPatchedSchema>;
export type AllocationPatchedInput = z.input<typeof AllocationPatchedSchema>;
