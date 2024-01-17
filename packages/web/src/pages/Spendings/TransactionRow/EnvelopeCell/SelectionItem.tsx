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
