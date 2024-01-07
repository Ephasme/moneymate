import {
  GetAccountsResponse,
  GetAccountParams,
  GetAccountResponse,
  GetAccountResponseSchema,
  GetAccountsResponseSchema,
  PostAccountsRequestInput,
  PostAccountsResponse,
} from "@moneymate/shared";
import { TokenProvider } from "../types/index.js";

export type AccountActions = {
  postAccounts(props: PostAccountsRequestInput): Promise<PostAccountsResponse>;
  getAccounts(props: { budgetId: string }): Promise<GetAccountsResponse>;
  getAccount(props: GetAccountParams): Promise<GetAccountResponse>;
};

export const postAccounts =
  (getToken: TokenProvider): AccountActions["postAccounts"] =>
  async (props) => {
    try {
      const path = `/api/account`;
      const url = new URL(path, "http://localhost:3000");
      const reply = await fetch(url.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(props),
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to post account");
      } else {
        const result = await reply.json();
        return result;
      }
    } catch (error) {
      console.error("Failed to post account", { error });
      throw error;
    }
  };

export const getAccount =
  (getToken: TokenProvider): AccountActions["getAccount"] =>
  async ({ accountId }) => {
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
  };

export const getAccounts =
  (getToken: TokenProvider): AccountActions["getAccounts"] =>
  async ({ budgetId }) => {
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
  };
