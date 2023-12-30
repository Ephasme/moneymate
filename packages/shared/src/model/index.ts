export const RecurrencePeriod = [
  "year",
  "semester",
  "quarter",
  "month",
  "week",
  "day",
] as const;
export type RecurrencePeriod = (typeof RecurrencePeriod)[number];

export const TransactionStatuses = [
  "pending",
  "cleared",
  "reconciled",
] as const;
export type TransactionStatus = (typeof TransactionStatuses)[number];

export function matchStatus<T>(
  status: TransactionStatus,
  {
    onCleared,
    onPending,
    onReconciled,
  }: {
    onPending?: () => T;
    onCleared?: () => T;
    onReconciled?: () => T;
  }
): T | null {
  switch (status) {
    case "pending":
      return onPending?.() ?? null;
    case "cleared":
      return onCleared?.() ?? null;
    case "reconciled":
      return onReconciled?.() ?? null;
  }
}
