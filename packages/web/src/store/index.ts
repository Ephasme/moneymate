import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import * as dateFns from "date-fns";

interface Store {
  moveNextMonth: () => void;
  movePreviousMonth: () => void;
  currentMonth: Date;

  setToken: (token: string) => void;
  token: string;

  setBudgetId: (budgetId: string) => void;
  budgetId: string;

  selectedEnvelopes: string[];
  setSelectedEnvelopes: (
    list: { envelopeId: string; checked: boolean }[]
  ) => void;
}

export const useStore = create<Store>()(
  devtools(
    persist(
      (set, get) => ({
        currentMonth: dateFns.startOfMonth(new Date()),
        moveNextMonth: () => {
          set({ currentMonth: dateFns.addMonths(get().currentMonth, 1) });
        },
        movePreviousMonth: () => {
          set({ currentMonth: dateFns.subMonths(get().currentMonth, 1) });
        },
        token: "",
        setToken: (token) => set({ token }),
        budgetId: "",
        setBudgetId: (budgetId) => set({ budgetId }),

        selectedEnvelopes: [] as string[],
        setSelectedEnvelopes: (list) => {
          for (const { envelopeId, checked } of list) {
            if (checked) {
              set({
                selectedEnvelopes: [...get().selectedEnvelopes, envelopeId],
              });
            } else {
              set({
                selectedEnvelopes: get().selectedEnvelopes.filter(
                  (x) => x !== envelopeId
                ),
              });
            }
          }
        },
      }),
      {
        name: "@moneymate/app",
        partialize: (state) => ({
          token: state.token,
          budgetId: state.budgetId,
        }),
      }
    )
  )
);
