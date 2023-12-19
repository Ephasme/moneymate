import {
  DeleteTransactionParams,
  DeleteTransactionResponse,
  SaveTransactionRequestInput,
  SaveTransactionResponse,
  GetTransactionsResponse,
  GetTransactionResponse,
  TransactionStatus,
  SaveTransactionStatusResponse,
  SaveTransactionResponseSchema,
  GetTransactionsResponseSchema,
  GetTransactionResponseSchema,
} from "@moneymate/shared";
import { TokenProvider } from "../types/index.js";

export type TransactionActions = {
  getTransactions(props: {
    budgetId: string;
    accountId: string;
  }): Promise<GetTransactionsResponse>;
  getTransaction(props: {
    transactionId: string;
  }): Promise<GetTransactionResponse>;
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
};

export const saveTransaction =
  (getToken: TokenProvider): TransactionActions["saveTransaction"] =>
  async (props) => {
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
  };

export const deleteTransaction =
  (getToken: TokenProvider): TransactionActions["deleteTransaction"] =>
  async (props) => {
    try {
      const enc_id = encodeURIComponent(props.transactionId);
      const path = `/api/transaction/${enc_id}`;
      const url = new URL(path, "http://localhost:3000");
      const reply = await fetch(url.href, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
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
  };

export const saveTransactionStatus =
  (getToken: TokenProvider): TransactionActions["saveTransactionStatus"] =>
  async ({ id, status }) => {
    try {
      const enc_id = encodeURIComponent(id);
      const path = `/api/transaction/${enc_id}/status`;
      const url = new URL(path, "http://localhost:3000");
      const reply = await fetch(url.href, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({ status }),
      });
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
  };

export const getTransactions =
  (getToken: TokenProvider): TransactionActions["getTransactions"] =>
  async ({ budgetId, accountId }) => {
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
  };

export const getTransaction =
  (getToken: TokenProvider): TransactionActions["getTransaction"] =>
  async ({ transactionId }) => {
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
  };
