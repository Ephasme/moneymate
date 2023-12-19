import {
  SaveEnvelopeGroupRequestSchema,
  SaveEnvelopeGroupResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Budget } from "../entities/Budget.js";
import { EnvelopeGroup } from "../entities/EnvelopeGroup.js";
import { getOrNew } from "../helpers/getOrNew.js";

export const SaveEnvelopeGroup = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.post(
      "/api/envelope-group",
      async (request, reply): Promise<SaveEnvelopeGroupResponse> => {
        const user = await request.user();
        const {
          name,
          id: envelopeGroupId,
          budgetId,
        } = SaveEnvelopeGroupRequestSchema.parse(request.body);

        const budget = await entities.findOneBy(Budget, { id: budgetId });
        if (!budget) {
          return reply.status(404).send({ message: "Budget not found" });
        }

        const [envelopeGroup] = await getOrNew(
          entities,
          user,
          EnvelopeGroup,
          envelopeGroupId
        );

        envelopeGroup.name = name;
        envelopeGroup.budgetId = budget.id;

        await entities.save(EnvelopeGroup, envelopeGroup);

        return { id: envelopeGroup.id };
      }
    );
    done();
  };
};
