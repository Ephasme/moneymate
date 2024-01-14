import {
  PostTransactionsRequestInput,
  PostTransactionsResponse,
  PostTransactionsResponseSchema,
  DeleteTransactionsRequest,
  DeleteTransactionsResponse,
  DeleteTransactionsResponseSchema,
  GetTransactionResponse,
  GetTransactionResponseSchema,
  GetTransactionsResponse,
  GetTransactionsResponseSchema,
  PatchTransactionsRequestInput,
  PatchTransactionsResponse,
  PutTransactionsRequestInput,
  PutTransactionsResponse,
  PutTransactionsResponseSchema,
} from "@moneymate/shared";
import { TokenProvider } from "../types/index.js";

export type TransactionActions = {
  getTransactions(props: {
    budgetId: string;
  }): Promise<GetTransactionsResponse>;
  getTransaction(props: {
    transactionId: string;
  }): Promise<GetTransactionResponse>;
  patchTransactions(
    props: PatchTransactionsRequestInput
  ): Promise<PatchTransactionsResponse>;
  postTransactions(
    props: PostTransactionsRequestInput
  ): Promise<PostTransactionsResponse>;
  putTransactions(
    props: PutTransactionsRequestInput
  ): Promise<PutTransactionsResponse>;
  deleteTransactions(
    props: DeleteTransactionsRequest
  ): Promise<DeleteTransactionsResponse>;
};

export const patchTransactions =
  (getToken: TokenProvider): TransactionActions["patchTransactions"] =>
  async (props) => {
    try {
      const reply = await fetch(`http://localhost:3000/api/transaction`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(props),
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to patch transaction");
      } else {
        const result = await reply.json();
        return PostTransactionsResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to patch transaction", { error });
      throw error;
    }
  };

export const putTransactions =
  (getToken: TokenProvider): TransactionActions["putTransactions"] =>
  async (props) => {
    try {
      const reply = await fetch(`http://localhost:3000/api/transaction`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(props),
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to put transaction");
      } else {
        const result = await reply.json();
        return PutTransactionsResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to put transaction", { error });
      throw error;
    }
  };

export const postTransactions =
  (getToken: TokenProvider): TransactionActions["postTransactions"] =>
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
        throw new Error("Failed to post transaction");
      } else {
        const result = await reply.json();
        return PostTransactionsResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to post transaction", { error });
      throw error;
    }
  };

export const deleteTransactions =
  (getToken: TokenProvider): TransactionActions["deleteTransactions"] =>
  async (props) => {
    try {
      const path = `/api/transaction`;
      const url = new URL(path, "http://localhost:3000");
      const reply = await fetch(url.href, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(props),
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to delete transaction");
      } else {
        const result = await reply.json();
        return DeleteTransactionsResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to delete transaction", { error });
      throw error;
    }
  };

export const getTransactions =
  (getToken: TokenProvider): TransactionActions["getTransactions"] =>
  async ({ budgetId }) => {
    try {
      const enc_budgetId = encodeURIComponent(budgetId);
      const path = `/api/budget/${enc_budgetId}/transaction`;
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
