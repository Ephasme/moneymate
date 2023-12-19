import {
  DeleteEnvelopeParams,
  DeleteEnvelopeResponse,
  DeleteEnvelopeResponseSchema,
  EditEnvelopeParams,
  EditEnvelopeRequest,
  EditEnvelopeResponse,
  EditEnvelopeResponseSchema,
  GetEnvelopeResponse,
  GetEnvelopeResponseSchema,
  GetEnvelopesResponse,
  GetEnvelopesResponseSchema,
  SaveEnvelopeRequestInput,
  SaveEnvelopeResponse,
  SaveEnvelopeResponseSchema,
} from "@moneymate/shared";
import * as dateFns from "date-fns";
import { TokenProvider } from "../types/index.js";

export type EnvelopeActions = {
  deleteEnvelope(props: DeleteEnvelopeParams): Promise<DeleteEnvelopeResponse>;
  saveEnvelope(props: SaveEnvelopeRequestInput): Promise<SaveEnvelopeResponse>;
  editEnvelope(
    props: EditEnvelopeParams & EditEnvelopeRequest
  ): Promise<EditEnvelopeResponse>;
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
};

export const editEnvelope =
  (getToken: TokenProvider): EnvelopeActions["editEnvelope"] =>
  async ({ envelopeId, ...body }) => {
    const enc_envelopeId = encodeURIComponent(envelopeId);
    const path = `/api/envelope/${enc_envelopeId}`;
    const url = new URL(path, "http://localhost:3000");
    try {
      const reply = await fetch(url.href, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(body),
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to create Envelope");
      } else {
        const result = await reply.json();
        return EditEnvelopeResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to create Envelope", { error });
      throw error;
    }
  };

export const saveEnvelope =
  (getToken: TokenProvider): EnvelopeActions["saveEnvelope"] =>
  async (props) => {
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
  };

export const deleteEnvelope =
  (getToken: TokenProvider): EnvelopeActions["deleteEnvelope"] =>
  async ({ envelopeId }) => {
    try {
      const enc_envelopeId = encodeURIComponent(envelopeId);
      const path = `/api/envelope/${enc_envelopeId}`;
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
        throw new Error("Failed to delete envelope");
      } else {
        const result = await reply.json();
        return DeleteEnvelopeResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to delete envelope", { error });
      throw error;
    }
  };

export const getEnvelope =
  (getToken: TokenProvider): EnvelopeActions["getEnvelope"] =>
  async ({ budgetId, envelopeId }, { currentMonth } = {}) => {
    try {
      const enc_envelopeId = encodeURIComponent(envelopeId);
      const enc_budgetId = encodeURIComponent(budgetId);
      const path = `/api/budget/${enc_budgetId}/envelope/${enc_envelopeId}`;
      const url = new URL(path, "http://localhost:3000");
      url.search = new URLSearchParams({
        currentMonth: currentMonth
          ? dateFns.format(currentMonth, "dd/MM/yyyy")
          : "",
      }).toString();
      const reply = await fetch(url.href, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
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
  };

export const getEnvelopes =
  (getToken: TokenProvider): EnvelopeActions["getEnvelopes"] =>
  async ({ budgetId }, { currentMonth } = {}) => {
    try {
      const enc_budgetId = encodeURIComponent(budgetId);
      const path = `/api/budget/${enc_budgetId}/envelope`;
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
        throw new Error("Failed to get envelopes");
      } else {
        const result = await reply.json();
        return GetEnvelopesResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to get envelopes", { error });
      throw error;
    }
  };
