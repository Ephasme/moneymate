import { randomUUID } from "crypto";
import {
  MAIN_ENVELOPE_GROUP_ID,
  SaveEnvelopeRequestSchema,
  SaveEnvelopeResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Envelope } from "../entities";
import { Budget } from "../entities/Budget";
import { getOrNew } from "../helpers/getOrNew";

export const SaveEnvelope = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.post(
      "/api/envelope",
      async (request, reply): Promise<SaveEnvelopeResponse> => {
        const user = await request.user();
        const {
          name,
          id: envelopeId,
          budgetId,
          parentId,
        } = SaveEnvelopeRequestSchema.parse(request.body);

        const budget = await entities.findOneBy(Budget, { id: budgetId });
        if (!budget) {
          return reply.status(404).send({ message: "Budget not found" });
        }

        const [envelope] = await getOrNew(entities, user, Envelope, envelopeId);

        envelope.name = name;
        envelope.budgetId = budget.id;
        envelope.parentId = parentId ?? MAIN_ENVELOPE_GROUP_ID;

        await entities.save(Envelope, envelope);

        return { id: envelope.id };
      }
    );
    done();
  };
};
