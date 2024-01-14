export const isKnownError = (
  error: unknown
): error is { message: string; status: number } => {
  if (typeof error === "object" && error !== null) {
    const { message, status } = error as { message: string; status: number };
    if (typeof message === "string" && typeof status === "number") {
      return true;
    }
  }
  return false;
};
