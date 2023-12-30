import {
  SaveAllocationResponseSchema,
  GetAllocationResponseSchema,
  DeleteAllocationResponse,
  SaveAllocationResponse,
  GetAllocationResponse,
} from "@moneymate/shared";
import { TokenProvider } from "../types/index.js";
import { z } from "zod";

const AllocationPropsSchema = z.object({
  id: z.string().uuid().optional(),
  budgetId: z.string(),
  transactionId: z.string(),
  envelopeId: z.string(),
  amount: z.number(),
});
type AllocationProps = z.infer<typeof AllocationPropsSchema>;

export type AllocationActions = {
  saveAllocation(props: AllocationProps): Promise<SaveAllocationResponse>;
  getAllocation(props: {
    allocationId: string;
  }): Promise<GetAllocationResponse>;
  deleteAllocation(props: {
    allocationId: string;
  }): Promise<DeleteAllocationResponse>;
};

export const saveAllocation =
  (getToken: TokenProvider): AllocationActions["saveAllocation"] =>
  async (props) => {
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
  };

export const getAllocation =
  (getToken: TokenProvider): AllocationActions["getAllocation"] =>
  async ({ allocationId }) => {
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
  };

export const deleteAllocation =
  (getToken: TokenProvider): AllocationActions["deleteAllocation"] =>
  async ({ allocationId }) => {
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
  };
