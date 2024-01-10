import { z } from "zod";

export type DeletePatch = { action: "delete" };
export type EditPatch<T> = { action: "edit"; value: T };
export type Patch<T> = DeletePatch | EditPatch<T>;

export function processPatch<T>(patch: Patch<T> | undefined, defaultValue: T) {
  if (patch) {
    if (patch.action === "delete") {
      return null;
    } else {
      return patch.value;
    }
  }
  return defaultValue;
}

export function makePatch<T>(
  value: T | null | undefined
): Patch<T> | undefined {
  if (value === undefined) return undefined;
  if (value === null) return { action: "delete" as const };
  return { action: "edit" as const, value };
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
