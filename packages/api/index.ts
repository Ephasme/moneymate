import {
  SaveAccountResponse,
  SaveAccountResponseSchema,
  SaveAllocationResponse,
  SaveBudgetResponse,
  SaveBudgetResponseSchema,
  SaveEnvelopeResponse,
  SaveEnvelopeResponseSchema,
  SaveTransactionResponse,
  SaveTransactionResponseSchema,
  GetAccountResponse,
  GetAccountResponseSchema,
  GetAccountsResponse,
  GetAccountsResponseSchema,
  GetBudgetsResponse,
  GetBudgetsResponseSchema,
  GetEnvelopeResponse,
  GetEnvelopeResponseSchema,
  GetEnvelopesResponse,
  GetEnvelopesResponseSchema,
  GetTransactionsResponse,
  GetTransactionsResponseSchema,
  SignInResponse,
  SignInResponseSchema,
  SignUpResponse,
  SignUpResponseSchema,
  GetBudgetResponse,
  GetBudgetResponseSchema,
  SaveAllocationResponseSchema,
  GetTransactionResponse,
  GetTransactionResponseSchema,
  GetAllocationResponseSchema,
  GetAllocationResponse,
  DeleteAllocationResponse,
  SaveTransferResponse,
  SaveTransferResponseSchema,
  SaveTransactionRequestInput,
  SaveTransferRequestInput,
  SaveEnvelopeRequestInput,
  TransactionStatus,
  SaveTransactionStatusResponse,
  GetAccountParams,
  DeleteTransactionResponse,
  SaveEnvelopeGroupRequestInput,
  SaveEnvelopeGroupResponse,
  GetEnvelopeGroupResponse,
  GetEnvelopeGroupsResponse,
  GetEnvelopeGroupsResponseSchema,
  GetEnvelopeGroupResponseSchema,
} from "@moneymate/shared";

import { z } from "zod";
import urlcat from "urlcat";
import * as dateFns from "date-fns";

const AllocationPropsSchema = z.object({
  id: z.string().uuid().optional(),
  budgetId: z.string(),
  transactionId: z.string(),
  envelopeId: z.string(),
  amount: z.number(),
});
type AllocationProps = z.infer<typeof AllocationPropsSchema>;

export interface Api {
  getTransactions(props: {
    budgetId: string;
    accountId: string;
  }): Promise<GetTransactionsResponse>;

  getTransaction(props: {
    transactionId: string;
  }): Promise<GetTransactionResponse>;
  saveAllocation(props: AllocationProps): Promise<SaveAllocationResponse>;
  deleteAllocation(props: {
    allocationId: string;
  }): Promise<DeleteAllocationResponse>;
  saveEnvelope(props: SaveEnvelopeRequestInput): Promise<SaveEnvelopeResponse>;
  saveEnvelopeGroup(
    props: SaveEnvelopeGroupRequestInput
  ): Promise<SaveEnvelopeGroupResponse>;
  saveTransfer(props: SaveTransferRequestInput): Promise<SaveTransferResponse>;
  saveTransaction(
    props: SaveTransactionRequestInput
  ): Promise<SaveTransactionResponse>;
  deleteTransaction(props: {
    transactionId: string;
  }): Promise<DeleteTransactionResponse>;

  saveTransactionStatus(props: {
    id: string;
    status: TransactionStatus;
  }): Promise<SaveTransactionStatusResponse>;

  saveBudget(props: { id?: string; name: string }): Promise<SaveBudgetResponse>;
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
  getEnvelopes(
    props: { budgetId: string },
    options?: { currentMonth?: Date }
  ): Promise<GetEnvelopesResponse>;
  getEnvelope(
    props: {
      budgetId: string;
      envelopeId: string;
    },
    options?: { currentMonth?: Date }
  ): Promise<GetEnvelopeResponse>;
  getEnvelopeGroup(props: {
    budgetId: string;
    envelopeGroupId: string;
  }): Promise<GetEnvelopeGroupResponse>;
  getEnvelopeGroups(props: {
    budgetId: string;
  }): Promise<GetEnvelopeGroupsResponse>;

  getAllocation(props: {
    allocationId: string;
  }): Promise<GetAllocationResponse>;
  getAccounts(props: { budgetId: string }): Promise<GetAccountsResponse>;
  getAccount(props: GetAccountParams): Promise<GetAccountResponse>;
  signIn(props: { email: string; password: string }): Promise<SignInResponse>;
  signUp(props: {
    email: string;
    password: string;
    passwordConfirmation: string;
  }): Promise<SignUpResponse>;
}

export const makeApi = (getToken: () => Promise<string | null>): Api => ({
  async deleteAllocation({ allocationId }) {
    try {
      const reply = await fetch(
        `http://localhost:3000/api/allocation/${allocationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to delete Allocation");
      } else {
        const result = await reply.json();
        return SaveAllocationResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to delete Allocation", { error });
      throw error;
    }
  },
  async saveTransfer(props) {
    try {
      const reply = await fetch(`http://localhost:3000/api/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(props),
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to save transfer");
      } else {
        const result = await reply.json();
        return SaveTransferResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to save transfer", { error });
      throw error;
    }
  },
  async saveAllocation(props) {
    try {
      const reply = await fetch(`http://localhost:3000/api/allocation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(props),
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to save Allocation");
      } else {
        const result = await reply.json();
        return SaveAllocationResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to save Allocation", { error });
      throw error;
    }
  },
  async saveEnvelope(props) {
    try {
      const reply = await fetch(`http://localhost:3000/api/envelope`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(props),
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to create Envelope");
      } else {
        const result = await reply.json();
        return SaveEnvelopeResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to create Envelope", { error });
      throw error;
    }
  },
  async saveEnvelopeGroup(props) {
    try {
      const reply = await fetch(`http://localhost:3000/api/envelope-group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(props),
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to create Envelope group");
      } else {
        const result = await reply.json();
        return SaveEnvelopeResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to create Envelope group", { error });
      throw error;
    }
  },

  async saveTransaction(props) {
    try {
      const reply = await fetch(`http://localhost:3000/api/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(props),
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to create transaction");
      } else {
        const result = await reply.json();
        return SaveTransactionResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to create transaction", { error });
      throw error;
    }
  },
  async deleteTransaction(props) {
    try {
      const reply = await fetch(
        urlcat(`http://localhost:3000/api/transaction/:id`, {
          id: props.transactionId,
        }),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to delete transaction");
      } else {
        const result = await reply.json();
        return SaveTransactionResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to delete transaction", { error });
      throw error;
    }
  },
  async saveTransactionStatus({ id, status }) {
    try {
      const reply = await fetch(
        urlcat("http://localhost:3000/api/transaction/:transactionId/status", {
          transactionId: id,
        }),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to save transaction status");
      } else {
        const result = await reply.json();
        return SaveTransactionResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to save transaction status", { error });
      throw error;
    }
  },
  async getAllocation({ allocationId }) {
    try {
      const reply = await fetch(
        `http://localhost:3000/api/allocation/${allocationId}`,
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
        throw new Error("Failed to get allocation");
      } else {
        const result = await reply.json();
        return GetAllocationResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to get allocation", { error });
      throw error;
    }
  },
  async getEnvelope({ budgetId, envelopeId }, { currentMonth } = {}) {
    try {
      const reply = await fetch(
        urlcat(
          `http://localhost:3000/api/budget/:budgetId/envelope/:envelopeId`,
          {
            budgetId,
            envelopeId,
            currentMonth: currentMonth
              ? dateFns.format(currentMonth, "dd/MM/yyyy")
              : undefined,
          }
        ),
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
        throw new Error("Failed to get envelope");
      } else {
        const result = await reply.json();
        return GetEnvelopeResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to get envelope", { error });
      throw error;
    }
  },
  async getEnvelopeGroup({ budgetId, envelopeGroupId }) {
    try {
      const reply = await fetch(
        urlcat(
          `http://localhost:3000/api/budget/:budgetId/envelope-group/:envelopeGroupId`,
          {
            budgetId,
            envelopeGroupId,
          }
        ),
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
        throw new Error("Failed to get envelope group");
      } else {
        const result = await reply.json();
        return GetEnvelopeGroupResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to get envelope group", { error });
      throw error;
    }
  },
  async getEnvelopeGroups({ budgetId }) {
    try {
      const reply = await fetch(
        urlcat(`http://localhost:3000/api/budget/:budgetId/envelope-group`, {
          budgetId,
        }),
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
        throw new Error("Failed to get envelope group");
      } else {
        const result = await reply.json();
        return GetEnvelopeGroupsResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to get envelope group", { error });
      throw error;
    }
  },
  async getEnvelopes({ budgetId }, { currentMonth } = {}) {
    try {
      const reply = await fetch(
        urlcat("http://localhost:3000/api/budget/:budgetId/envelope", {
          budgetId,
          currentMonth: currentMonth
            ? dateFns.format(currentMonth, "dd/MM/yyyy")
            : undefined,
        }),
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
        throw new Error("Failed to get envelopes");
      } else {
        const result = await reply.json();
        return GetEnvelopesResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to get envelopes", { error });
      throw error;
    }
  },
  async getTransactions({ budgetId, accountId }) {
    try {
      const reply = await fetch(
        `http://localhost:3000/api/budget/${budgetId}/account/${accountId}/transaction`,
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
        throw new Error("Failed to get transactions");
      } else {
        const result = await reply.json();
        return GetTransactionsResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to get transactions", { error });
      throw error;
    }
  },

  async getAccount({ accountId }) {
    try {
      const reply = await fetch(
        urlcat("http://localhost:3000/api/account/:accountId", {
          accountId,
        }),
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

  async getTransaction({ transactionId }) {
    try {
      const reply = await fetch(
        `http://localhost:3000/api/transaction/${transactionId}`,
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
        throw new Error("Failed to get transaction");
      } else {
        const result = await reply.json();
        return GetTransactionResponseSchema.parse(result);
      }
    } catch (error) {
      console.log("Could not fetch transaction", { error });
      throw error;
    }
  },
  async getBudget({ budgetId }, { currentMonth } = {}) {
    try {
      const reply = await fetch(
        urlcat("http://localhost:3000/api/budget/:budgetId", {
          budgetId,
          currentMonth: currentMonth
            ? dateFns.format(currentMonth, "dd/MM/yyyy")
            : undefined,
        }),
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
