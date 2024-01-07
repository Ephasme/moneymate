import { GetPayeesResponse, GetPayeesResponseSchema } from "@moneymate/shared";
import { TokenProvider } from "../types/index.js";

export type PayeeActions = {
  getPayees(props: { budgetId: string }): Promise<GetPayeesResponse>;
};

export const getPayees =
  (getToken: TokenProvider): PayeeActions["getPayees"] =>
  async ({ budgetId }) => {
    try {
      const enc_budgetId = encodeURIComponent(budgetId);
      const path = `/api/budget/${enc_budgetId}/payee`;
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
        throw new Error("Failed to get payees");
      } else {
        const result = await reply.json();
        return GetPayeesResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Could not fetch payees", { error });
      throw error;
    }
  };
