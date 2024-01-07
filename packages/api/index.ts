import {
  GetBudgetResponse,
  GetBudgetResponseSchema,
  GetBudgetsResponse,
  GetBudgetsResponseSchema,
  SaveBudgetResponse,
  SaveBudgetResponseSchema,
  SignInResponse,
  SignInResponseSchema,
  SignUpResponse,
  SignUpResponseSchema,
} from "@moneymate/shared";
import {
  EnvelopeActions,
  postEnvelopes,
  getEnvelope,
  getEnvelopes,
  patchEnvelopes,
} from "./src/Envelope/index.js";
import {
  EnvelopeGroupActions,
  deleteEnvelopeGroup,
  editEnvelopeGroup,
  getEnvelopeGroup,
  getEnvelopeGroups,
  saveEnvelopeGroup,
} from "./src/EnvelopeGroup/index.js";
import {
  TransactionActions,
  postTransactions,
  deleteTransactions,
  getTransaction,
  getTransactions,
  patchTransactions,
} from "./src/Transaction/index.js";
import { TransferActions, postTransfers } from "./src/Transfer/index.js";

import * as dateFns from "date-fns";
import {
  AllocationActions,
  deleteAllocation,
  getAllocation,
  saveAllocation,
} from "./src/Allocation/index.js";
import { TokenProvider } from "./src/types/index.js";
import {
  AccountActions,
  getAccount,
  getAccounts,
  postAccounts,
} from "./src/Account/index.js";
import { PayeeActions, getPayees } from "./src/Payee/index.js";

export const sayHi = (value: string) => {
  return `hi ${value}`;
};

export type Api = AccountActions &
  AllocationActions &
  EnvelopeActions &
  EnvelopeGroupActions &
  TransactionActions &
  TransferActions &
  PayeeActions & {
    saveBudget(props: {
      id?: string;
      name: string;
    }): Promise<SaveBudgetResponse>;
    getBudgets(): Promise<GetBudgetsResponse>;
    getBudget(
      props: { budgetId: string },
      options?: { currentMonth?: Date }
    ): Promise<GetBudgetResponse>;

    signIn(props: { email: string; password: string }): Promise<SignInResponse>;
    signUp(props: {
      email: string;
      password: string;
      passwordConfirmation: string;
    }): Promise<SignUpResponse>;
  };

export const makeApi = (getToken: TokenProvider): Api => ({
  postTransactions: postTransactions(getToken),
  deleteAllocation: deleteAllocation(getToken),
  deleteEnvelopeGroup: deleteEnvelopeGroup(getToken),
  deleteTransactions: deleteTransactions(getToken),
  editEnvelopeGroup: editEnvelopeGroup(getToken),
  getAccount: getAccount(getToken),
  getAccounts: getAccounts(getToken),
  getAllocation: getAllocation(getToken),
  getEnvelope: getEnvelope(getToken),
  getEnvelopeGroup: getEnvelopeGroup(getToken),
  getEnvelopeGroups: getEnvelopeGroups(getToken),
  getEnvelopes: getEnvelopes(getToken),
  getTransaction: getTransaction(getToken),
  getTransactions: getTransactions(getToken),
  patchEnvelopes: patchEnvelopes(getToken),
  patchTransactions: patchTransactions(getToken),
  postAccounts: postAccounts(getToken),
  postEnvelopes: postEnvelopes(getToken),
  postTransfers: postTransfers(getToken),
  saveAllocation: saveAllocation(getToken),
  saveEnvelopeGroup: saveEnvelopeGroup(getToken),
  getPayees: getPayees(getToken),

  async saveBudget(props) {
    try {
      const reply = await fetch("http://localhost:3000/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(props),
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to create budget");
      } else {
        const result = await reply.json();
        return SaveBudgetResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to create budget", { error });
      throw error;
    }
  },

  async getBudget({ budgetId }, { currentMonth } = {}) {
    try {
      const enc_budgetId = encodeURIComponent(budgetId);
      const path = `/api/budget/${enc_budgetId}`;
      const url = new URL(path, "http://localhost:3000");
      if (currentMonth) {
        url.searchParams.append(
          "currentMonth",
          dateFns.format(currentMonth, "dd/MM/yyyy")
        );
      }
      const reply = await fetch(url.href, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to get budget");
      } else {
        const result = await reply.json();
        return GetBudgetResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Could not fetch budget", { error });
      throw error;
    }
  },

  async getBudgets(): Promise<GetBudgetsResponse> {
    try {
      const reply = await fetch("http://localhost:3000/api/budget", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to get budgets");
      } else {
        const result = await reply.json();
        return GetBudgetsResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Could not fetch budgets", { error });
      throw error;
    }
  },

  async signIn(props) {
    const reply = await fetch("http://localhost:3000/api/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    });

    if (!reply.ok) {
      console.error(await reply.text());
      throw new Error("Failed to sign in");
    } else {
      return SignInResponseSchema.parse(await reply.json());
    }
  },

  async signUp(props) {
    const reply = await fetch("http://localhost:3000/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    });

    if (!reply.ok) {
      console.error(await reply.text());
      throw new Error("Failed to sign up");
    } else {
      return SignUpResponseSchema.parse(await reply.json());
    }
  },
});
