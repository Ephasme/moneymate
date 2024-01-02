import {
  PostTransfersRequestSchema,
  PostTransfersResponse,
} from "@moneymate/shared";
import { randomUUID } from "crypto";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Transfer } from "../entities/index.js";

export const PostTransfers = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.post(
      "/api/transfer",
      async (request, reply): Promise<PostTransfersResponse> => {
        const user = await request.user();
        const list = PostTransfersRequestSchema.parse(request.body);

        for (const {
          id,
          budgetId,
          amount,
          fromEnvelopeId,
          toEnvelopeId,
          date,
        } of list) {
          const transfer = new Transfer();

          transfer.id = id ?? randomUUID();
          transfer.userId = user.id;
          transfer.date = date;
          transfer.amount = amount.toString();
          transfer.budgetId = budgetId;
          transfer.fromEnvelopeId = fromEnvelopeId;
          transfer.toEnvelopeId = toEnvelopeId;

          await entities.save(Transfer, transfer);
        }

        return null;
      }
    );
    done();
  };
};
