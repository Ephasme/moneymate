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
