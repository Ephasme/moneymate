import { EnvelopeView } from "@moneymate/shared";
import { createContext } from "react";
import { NullableSelectionItem } from "./SelectionItem";
import React from "react";

export const MultiEnvelopeSelectorContext = createContext<{
  envelopes: EnvelopeView[];
  selection: NullableSelectionItem[];
  setSelection: React.Dispatch<React.SetStateAction<NullableSelectionItem[]>>;
  actions: {
    assignRemainderTo: (envelopeId: string) => void;
    splitAll: () => void;
    splitRemainder: () => void;
  };
  addEnvelope: () => void;
  removeEnvelope: (id: string) => void;
  setAmount: (id: string, amount: bigint) => void;
  setEnvelope: (id: string, envelopeId: string) => void;
  toggleEnvelope: (envelopeId: string) => void;
  closeSelf: () => void;
  submit: () => void;
  setStep: (step: number) => void;
  updateFloating: () => void;
}>(null!);

export const useMultiEnvelopeSelectorContext = () =>
  React.useContext(MultiEnvelopeSelectorContext);
