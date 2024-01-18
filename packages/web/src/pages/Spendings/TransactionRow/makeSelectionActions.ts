import { produce } from "immer";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import { NullableSelectionItem } from "./EnvelopeCell/SelectionItem";

const setAmount =
  (
    setSelection: (
      fn: (x: NullableSelectionItem[]) => NullableSelectionItem[]
    ) => void
  ) =>
  (id: string, amount: bigint) => {
    setSelection(
      produce((list) => {
        const index = _(list).findIndex((x) => x.id === id);
        if (index !== -1) {
          list[index].amount = amount;
        }
      })
    );
  };

const setEnvelope =
  (
    setSelection: (
      fn: (x: NullableSelectionItem[]) => NullableSelectionItem[]
    ) => void
  ) =>
  (id: string, envelopeId: string | null) => {
    setSelection(
      produce((list) => {
        const index = _(list).findIndex((x) => x.id === id);
        if (index !== -1 && envelopeId) {
          list[index].envelopeId = envelopeId;
        }
      })
    );
  };

const addEnvelope =
  (
    setSelection: (
      fn: (x: NullableSelectionItem[]) => NullableSelectionItem[]
    ) => void
  ) =>
  () => {
    setSelection(
      produce((list) => {
        list.push({ id: uuid(), amount: 0n });
      })
    );
  };

const removeEnvelope =
  (
    setSelection: (
      fn: (x: NullableSelectionItem[]) => NullableSelectionItem[]
    ) => void
  ) =>
  (id: string) => {
    setSelection(
      produce((list) => {
        _.remove(list, (x) => x.id === id);
      })
    );
  };
const toggleEnvelope =
  (
    setSelection: (
      fn: (x: NullableSelectionItem[]) => NullableSelectionItem[]
    ) => void
  ) =>
  (envelopeId: string) => {
    setSelection(
      produce((list) => {
        const index = _(list).findIndex((x) => x.envelopeId === envelopeId);
        if (index !== -1) {
          list.splice(index, 1);
        } else {
          list.push({ id: uuid(), envelopeId, amount: 0n });
        }
      })
    );
  };

export const makeSelectionActions = (
  setSelection: (
    fn: (x: NullableSelectionItem[]) => NullableSelectionItem[]
  ) => void
) => {
  return {
    setAmount: setAmount(setSelection),
    setEnvelope: setEnvelope(setSelection),
    addEnvelope: addEnvelope(setSelection),
    removeEnvelope: removeEnvelope(setSelection),
    toggleEnvelope: toggleEnvelope(setSelection),
  };
};
