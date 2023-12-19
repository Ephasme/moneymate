import {
  SaveTransferRequestSchema,
  SaveTransferResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Transfer } from "../entities/index.js";
import { Budget } from "../entities/Budget.js";
import { getOrNew } from "../helpers/getOrNew.js";

export const SaveTransfer = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.post(
      "/api/transfer",
      async (request, reply): Promise<SaveTransferResponse> => {
        const user = await request.user();
        const {
          id: transferId,
          budgetId,
          amount,
          fromEnvelopeId,
          toEnvelopeId,
          date,
        } = SaveTransferRequestSchema.parse(request.body);

        const budget = await entities.findOneBy(Budget, { id: budgetId });
        if (!budget) {
          return reply.status(404).send({ message: "Budget not found" });
        }

        const [transfer] = await getOrNew(entities, user, Transfer, transferId);

        transfer.date = date;
        transfer.amount = amount.toString();
        transfer.budgetId = budget.id;
        transfer.fromEnvelopeId = fromEnvelopeId;
        transfer.toEnvelopeId = toEnvelopeId;

        await entities.save(Transfer, transfer);
        return { id: transfer.id };
      }
    );
    done();
  };
};
