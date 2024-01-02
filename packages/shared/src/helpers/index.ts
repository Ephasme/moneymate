import { z } from "zod";

export function processPatch<T>(
  patch: { action: "delete" } | { action: "edit"; value: T } | undefined,
  defaultValue: T
) {
  if (patch) {
    if (patch.action === "delete") {
      return null;
    } else {
      return patch.value;
    }
  }
  return defaultValue;
}

export const patchOption = <A, B extends z.ZodTypeDef, C>(
  input: z.ZodType<A, B, C>
) => {
  return z
    .discriminatedUnion("action", [
      z.object({
        action: z.literal("delete"),
      }),
      z.object({
        action: z.literal("edit"),
        value: input,
      }),
    ])
    .optional();
};
