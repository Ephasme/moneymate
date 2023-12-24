import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type AccountsStore = {
  expectedReconciledBalance?: bigint;
  setExpectedReconciledBalance: (value: bigint | undefined) => void;

  selectedTransactions: string[];
  selectTransaction: (id: string) => void;
  removeTransaction: (id: string) => void;
  clearTransactions: () => void;
};
export const useAccountsStore = create<AccountsStore>()(
  immer((set) => ({
    expectedReconciledBalance: undefined,
    setExpectedReconciledBalance: (value: bigint | undefined) => {
      set((state) => {
        state.expectedReconciledBalance = value;
      });
    },
    selectedTransactions: [],
    selectTransaction: (id: string) => {
      set((state) => {
        state.selectedTransactions.push(id);
      });
    },
    removeTransaction: (id: string) => {
      set((state) => {
        state.selectedTransactions = state.selectedTransactions.filter(
          (item) => item !== id
        );
      });
    },
    clearTransactions: () => {
      set((state) => {
        state.selectedTransactions = [];
      });
    },
  }))
);
