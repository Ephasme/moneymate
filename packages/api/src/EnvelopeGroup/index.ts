import {
  DeleteEnvelopeGroupParams,
  DeleteEnvelopeGroupResponse,
  DeleteEnvelopeGroupResponseSchema,
  EditEnvelopeGroupParams,
  EditEnvelopeGroupRequest,
  EditEnvelopeGroupResponse,
  EditEnvelopeGroupResponseSchema,
  GetEnvelopeGroupResponse,
  GetEnvelopeGroupResponseSchema,
  GetEnvelopeGroupsResponse,
  GetEnvelopeGroupsResponseSchema,
  SaveEnvelopeGroupRequestInput,
  SaveEnvelopeGroupResponse,
  SaveEnvelopeGroupResponseSchema,
} from "@moneymate/shared";
import { TokenProvider } from "../types/index.js";

export type EnvelopeGroupActions = {
  saveEnvelopeGroup(
    props: SaveEnvelopeGroupRequestInput
  ): Promise<SaveEnvelopeGroupResponse>;
  editEnvelopeGroup(
    props: EditEnvelopeGroupParams & EditEnvelopeGroupRequest
  ): Promise<EditEnvelopeGroupResponse>;
  getEnvelopeGroup(props: {
    envelopeGroupId: string;
  }): Promise<GetEnvelopeGroupResponse>;
  getEnvelopeGroups(props: {
    budgetId: string;
  }): Promise<GetEnvelopeGroupsResponse>;
  deleteEnvelopeGroup(
    props: DeleteEnvelopeGroupParams
  ): Promise<DeleteEnvelopeGroupResponse>;
};

export const editEnvelopeGroup =
  (getToken: TokenProvider): EnvelopeGroupActions["editEnvelopeGroup"] =>
  async ({ envelopeGroupId, ...body }) => {
    const enc_envelopeGroupId = encodeURIComponent(envelopeGroupId);
    const path = `/api/envelope-group/${enc_envelopeGroupId}`;
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
        throw new Error("Failed to create Envelope group");
      } else {
        const result = await reply.json();
        return EditEnvelopeGroupResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to create Envelope group", { error });
      throw error;
    }
  };

export const deleteEnvelopeGroup =
  (getToken: TokenProvider): EnvelopeGroupActions["deleteEnvelopeGroup"] =>
  async ({ envelopeGroupId }) => {
    try {
      const enc_envelopeGroupId = encodeURIComponent(envelopeGroupId);
      const path = `/api/envelope-group/${enc_envelopeGroupId}`;
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
        throw new Error("Failed to delete Envelope group");
      } else {
        const result = await reply.json();
        return DeleteEnvelopeGroupResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to delete Envelope group", { error });
      throw error;
    }
  };

export const saveEnvelopeGroup =
  (getToken: TokenProvider): EnvelopeGroupActions["saveEnvelopeGroup"] =>
  async (props) => {
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
        return SaveEnvelopeGroupResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to create Envelope group", { error });
      throw error;
    }
  };

export const getEnvelopeGroup =
  (getToken: TokenProvider): EnvelopeGroupActions["getEnvelopeGroup"] =>
  async ({ envelopeGroupId }) => {
    try {
      const enc_envelopeGroupId = encodeURIComponent(envelopeGroupId);
      const path = `/api/envelope-group/${enc_envelopeGroupId}`;
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
        throw new Error("Failed to get envelope group");
      } else {
        const result = await reply.json();
        return GetEnvelopeGroupResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to get envelope group", { error });
      throw error;
    }
  };
export const getEnvelopeGroups =
  (getToken: TokenProvider): EnvelopeGroupActions["getEnvelopeGroups"] =>
  async ({ budgetId }) => {
    try {
      const enc_budgetId = encodeURIComponent(budgetId);
      const path = `/api/budget/${enc_budgetId}/envelope-group`;
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
        throw new Error("Failed to get envelope group");
      } else {
        const result = await reply.json();
        return GetEnvelopeGroupsResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to get envelope group", { error });
      throw error;
    }
  };
