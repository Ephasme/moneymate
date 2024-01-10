import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { api } from "../../api";
export const queries = createQueryKeyStore({
  payees: {
    list: (budgetId: string) => ({
      queryKey: [budgetId],
      queryFn: () => api.getPayees({ budgetId }),
    }),
  },
  transactions: {
    list: (budgetId: string) => ({
      queryKey: [budgetId],
      queryFn: () => api.getTransactions({ budgetId }),
    }),
    details: (transactionId: string) => ({
      queryKey: [transactionId],
      queryFn: () => api.getTransaction({ transactionId }),
    }),
  },
  envelopeGroups: {
    list: ({ budgetId }: { budgetId: string }) => ({
      queryKey: [{ budgetId }],
      queryFn: () => api.getEnvelopeGroups({ budgetId: budgetId! }),
    }),
  },
  envelopes: {
    details: (
      envelopeId: string,
      { currentMonth }: { currentMonth: Date }
    ) => ({
      queryKey: [envelopeId, { currentMonth }],
      queryFn: () => api.getEnvelope({ envelopeId }, { currentMonth }),
    }),
    list: ({
      budgetId,
      currentMonth,
    }: {
      budgetId: string;
      currentMonth: Date;
    }) => ({
      queryKey: [{ budgetId, currentMonth }],
      queryFn: () => api.getEnvelopes({ budgetId }, { currentMonth }),
    }),
  },
  accounts: {
    details: (accountId: string) => ({
      queryKey: [accountId],
      queryFn: () => api.getAccount({ accountId }),
    }),
    list: ({ budgetId }: { budgetId: string }) => ({
      queryKey: [{ budgetId }],
      queryFn: () => api.getAccounts({ budgetId }),
    }),
  },
  budgets: {
    list: {
      queryKey: null,
      queryFn: api.getBudgets,
    },
    details: (budgetId, { currentMonth }) => ({
      queryKey: [budgetId, { currentMonth }],
      queryFn: () => api.getBudget({ budgetId }, { currentMonth }),
    }),
  },
});
