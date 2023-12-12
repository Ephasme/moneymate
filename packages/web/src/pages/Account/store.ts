import { create } from "zustand";

export type AccountsStore = {
  selectedTransactions: string[];
  selectTransaction: (id: string) => void;
  removeTransaction: (id: string) => void;
  clearTransactions: () => void;
};
export const useAccountsStore = create<AccountsStore>()((set) => ({
  selectedTransactions: [],
  selectTransaction: (id: string) => {
    set((state) => {
      return {
        ...state,
        selectedTransactions: [...state.selectedTransactions, id],
      };
    });
  },
  removeTransaction: (id: string) => {
    set((state) => {
      return {
        ...state,
        selectedTransactions: state.selectedTransactions.filter(
          (item) => item !== id
        ),
      };
    });
  },
  clearTransactions: () => {
    set((state) => {
      return {
        ...state,
        selectedTransactions: [],
      };
    });
  },
}));
