import _ from "lodash";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type BudgetViewStore = {
  selectedEnvelopes: string[];
  groupStates: Record<string, "open" | "closed">;
  setGroupStates: (states: Record<string, "open" | "closed">) => void;
  toggleGroupState: (id: string) => void;
  selectEnvelopes: (id: string[]) => void;
  removeEnvelopes: (id: string[]) => void;
  clearEnvelopes: () => void;
  setSelectedEnvelopes: (envelopes: string[]) => void;
};

export const useBudgetViewStore = create<BudgetViewStore>()(
  immer((set) => ({
    groupStates: {},
    setGroupStates: (states) => {
      set((s) => {
        s.groupStates = states;
      });
    },
    toggleGroupState: (id) => {
      set((s) => {
        s.groupStates[id] = s.groupStates[id] === "open" ? "closed" : "open";
      });
    },
    selectedEnvelopes: [],
    selectEnvelopes: (id) => {
      set((state) => {
        id.forEach((x) => state.selectedEnvelopes.push(x));
      });
    },
    removeEnvelopes: (id) => {
      set((state) => {
        state.selectedEnvelopes = _.difference(state.selectedEnvelopes, id);
      });
    },
    clearEnvelopes: () => {
      set((state) => {
        state.selectedEnvelopes = [];
      });
    },
    setSelectedEnvelopes: (envelopes) => {
      set((state) => {
        state.selectedEnvelopes = envelopes;
      });
    },
  }))
);
