import {
  PostTransfersRequestInput,
  PostTransfersResponse,
  PostTransfersResponseSchema,
} from "@moneymate/shared";
import { TokenProvider } from "../types/index.js";

export type TransferActions = {
  postTransfers(
    props: PostTransfersRequestInput
  ): Promise<PostTransfersResponse>;
};

export const postTransfers =
  (getToken: TokenProvider): TransferActions["postTransfers"] =>
  async (props: PostTransfersRequestInput) => {
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
        throw new Error("Failed to post transfer");
      } else {
        const result = await reply.json();
        return PostTransfersResponseSchema.parse(result);
      }
    } catch (error) {
      console.error("Failed to post transfer", { error });
      throw error;
    }
  };
