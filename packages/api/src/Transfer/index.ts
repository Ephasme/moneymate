import {
  SaveTransferRequestInput,
  SaveTransferResponse,
  SaveTransferResponseSchema,
} from "@moneymate/shared";
import { TokenProvider } from "../types/index.js";

export type TransferActions = {
  saveTransfer(props: SaveTransferRequestInput): Promise<SaveTransferResponse>;
};

export const saveTransfer =
  (getToken: TokenProvider): TransferActions["saveTransfer"] =>
  async (props: SaveTransferRequestInput) => {
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
  };
