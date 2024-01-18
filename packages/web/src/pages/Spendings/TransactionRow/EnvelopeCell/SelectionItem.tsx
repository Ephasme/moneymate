export type NullableSelectionItem = {
  id: string;
  envelopeId?: string;
  amount: bigint;
};

export type SelectionItem = {
  id: string;
  envelopeId: string;
  amount: bigint;
};

export const keepValid = (
  allocation: NullableSelectionItem
): allocation is SelectionItem => !!allocation.envelopeId;

export const selectionToAllocations = (
  selection: NullableSelectionItem[],
  totalAmount: bigint
) =>
  selection.filter(keepValid).map((x) => ({
    envelopeId: x.envelopeId,
    amount:
      selection.length === 1
        ? totalAmount.toString()
        : x.amount?.toString() ?? "0",
  }));
