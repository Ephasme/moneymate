import {
  GetAccountParams,
  GetAccountResponse,
  GetAccountResponseSchema,
  GetAccountsResponse,
  GetAccountsResponseSchema,
  GetBudgetResponse,
  GetBudgetResponseSchema,
  GetBudgetsResponse,
  GetBudgetsResponseSchema,
  SaveAccountResponse,
  SaveAccountResponseSchema,
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
  createTransactions,
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

export const sayHi = (value: string) => {
  return `hi ${value}`;
};

export type Api = TransferActions &
  EnvelopeActions &
  EnvelopeGroupActions &
  TransactionActions &
  AllocationActions & {
    saveBudget(props: {
      id?: string;
      name: string;
    }): Promise<SaveBudgetResponse>;
    saveAccount(props: {
      id?: string;
      name: string;
      budgetId: string;
    }): Promise<SaveAccountResponse>;
    getBudgets(): Promise<GetBudgetsResponse>;
    getBudget(
      props: { budgetId: string },
      options?: { currentMonth?: Date }
    ): Promise<GetBudgetResponse>;

    getAccounts(props: { budgetId: string }): Promise<GetAccountsResponse>;
    getAccount(props: GetAccountParams): Promise<GetAccountResponse>;
    signIn(props: { email: string; password: string }): Promise<SignInResponse>;
    signUp(props: {
      email: string;
      password: string;
      passwordConfirmation: string;
    }): Promise<SignUpResponse>;
  };

export const makeApi = (getToken: TokenProvider): Api => ({
  createTransactions: createTransactions(getToken),
  deleteAllocation: deleteAllocation(getToken),
  deleteEnvelopeGroup: deleteEnvelopeGroup(getToken),
  deleteTransactions: deleteTransactions(getToken),
  editEnvelopeGroup: editEnvelopeGroup(getToken),
  getAllocation: getAllocation(getToken),
  getEnvelope: getEnvelope(getToken),
  getEnvelopeGroup: getEnvelopeGroup(getToken),
  getEnvelopeGroups: getEnvelopeGroups(getToken),
  getEnvelopes: getEnvelopes(getToken),
  getTransaction: getTransaction(getToken),
  getTransactions: getTransactions(getToken),
  patchEnvelopes: patchEnvelopes(getToken),
  patchTransactions: patchTransactions(getToken),
  saveAllocation: saveAllocation(getToken),
  postEnvelopes: postEnvelopes(getToken),
  saveEnvelopeGroup: saveEnvelopeGroup(getToken),
  postTransfers: postTransfers(getToken),

  async getAccount({ accountId }) {
    try {
      const enc_accountId = encodeURIComponent(accountId);
      const path = `/api/account/${enc_accountId}`;
      const url = new URL(path, "http://localhost:3000");
      const reply = await fetch(url.href, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to get account");
      } else {
        const result = await reply.json();
        return GetAccountResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to get account", { error });
      throw error;
    }
  },

  async saveAccount(props) {
    try {
      const reply = await fetch(`http://localhost:3000/api/account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(props),
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to create account");
      } else {
        const result = await reply.json();
        return SaveAccountResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to create account", { error });
      throw error;
    }
  },
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

  async getAccounts({ budgetId }) {
    try {
      const reply = await fetch(
        `http://localhost:3000/api/budget/${budgetId}/account`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to get budgets");
      } else {
        const result = await reply.json();
        return GetAccountsResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Could not fetch budgets", { error });
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
