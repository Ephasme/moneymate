import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import * as dateFns from "date-fns";

interface Store {
  rightPanelCollapsed: boolean;
  setRightPanelCollapsed: (showRightPanel: boolean) => void;

  leftPanelCollapsed: boolean;
  setLeftPanelCollapsed: (collapseLeftPanel: boolean) => void;

  setCurrentMonth: (currentMonth: Date) => void;
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
        rightPanelCollapsed: true,
        setRightPanelCollapsed: (value) => set({ rightPanelCollapsed: value }),
        leftPanelCollapsed: false,
        setLeftPanelCollapsed: (value) => set({ leftPanelCollapsed: value }),
        currentMonth: dateFns.startOfMonth(new Date()),
        setCurrentMonth: (currentMonth) => set({ currentMonth }),
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
