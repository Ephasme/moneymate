import {
  GetEnvelopeResponse,
  GetEnvelopeResponseSchema,
  GetEnvelopesResponse,
  GetEnvelopesResponseSchema,
  PatchEnvelopesRequestInput,
  PatchEnvelopesResponse,
  PostEnvelopesRequestInput,
  PostEnvelopesResponse,
  PostEnvelopesResponseSchema,
} from "@moneymate/shared";
import * as dateFns from "date-fns";
import { TokenProvider } from "../types/index.js";

export type EnvelopeActions = {
  postEnvelopes(
    props: PostEnvelopesRequestInput
  ): Promise<PostEnvelopesResponse>;
  patchEnvelopes(
    props: PatchEnvelopesRequestInput
  ): Promise<PatchEnvelopesResponse>;
  getEnvelopes(
    props: { budgetId: string },
    options?: { currentMonth?: Date }
  ): Promise<GetEnvelopesResponse>;
  getEnvelope(
    props: {
      envelopeId: string;
    },
    options?: { currentMonth?: Date }
  ): Promise<GetEnvelopeResponse>;
};

export const patchEnvelopes =
  (getToken: TokenProvider) => async (body: PatchEnvelopesRequestInput) => {
    try {
      const path = `/api/envelope`;
      const url = new URL(path, "http://localhost:3000");
      const reply = await fetch(url.href, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(body),
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to patch envelopes");
      } else {
        return reply.json();
      }
    } catch (error) {
      console.error("Failed to patch envelopes", { error });
      throw error;
    }
  };

export const postEnvelopes =
  (getToken: TokenProvider) => async (body: PostEnvelopesRequestInput) => {
    try {
      const path = `/api/envelope`;
      const url = new URL(path, "http://localhost:3000");
      const reply = await fetch(url.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(body),
      });
      if (!reply.ok) {
        console.error(await reply.text());
        throw new Error("Failed to post envelope");
      } else {
        return PostEnvelopesResponseSchema.parse(await reply.json());
      }
    } catch (error) {
      console.error("Failed to post envelope", { error });
      throw error;
    }
  };

export const getEnvelope =
  (getToken: TokenProvider): EnvelopeActions["getEnvelope"] =>
  async ({ envelopeId }, { currentMonth } = {}) => {
    try {
      const enc_envelopeId = encodeURIComponent(envelopeId);
      const path = `/api/envelope/${enc_envelopeId}`;
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
