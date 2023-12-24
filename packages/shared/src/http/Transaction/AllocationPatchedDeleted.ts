import { z } from "zod";

export const AllocationPatchedDeletedSchema = z.object({
  id: z.string().uuid(),
  status: z.literal("deleted"),
});
export type AllocationPatchedDeleted = z.infer<
  typeof AllocationPatchedDeletedSchema
>;
