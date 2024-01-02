import {
  MAIN_ENVELOPE_ID,
  SYSTEM_ENVELOPE_GROUP_ID,
  SaveBudgetRequestSchema,
  SaveBudgetResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Budget } from "../entities/Budget.js";
import { EnvelopeGroup } from "../entities/EnvelopeGroup.js";
import { Envelope } from "../entities/index.js";
import { getOrNew } from "../helpers/getOrNew.js";

export const SaveBudget = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.post(
      "/api/budget",
      async (request, reply): Promise<SaveBudgetResponse> => {
        const user = await request.user();
        const { name, id: budgetId } = SaveBudgetRequestSchema.parse(
          request.body
        );

        const [budget, isNew] = await getOrNew(
          entities,
          user,
          Budget,
          budgetId
        );

        entities.transaction(async (manager) => {
          budget.name = name;
          await manager.save(Budget, budget);

          if (isNew) {
            const systemGroup = new EnvelopeGroup();
            systemGroup.id = SYSTEM_ENVELOPE_GROUP_ID;
            systemGroup.budgetId = budget.id;
            systemGroup.userId = user.id;
            systemGroup.name = "System";
            systemGroup.isSystem = true;
            await manager.save(systemGroup);

            const mainEnvelope = new Envelope();
            mainEnvelope.id = MAIN_ENVELOPE_ID;
            mainEnvelope.description = "Defaut envelope";
            mainEnvelope.emoji = "💰";
            mainEnvelope.budgetId = budget.id;
            mainEnvelope.userId = user.id;
            mainEnvelope.name = "Ready to Assign";
            mainEnvelope.isDefault = true;
            mainEnvelope.isHidden = false;
            await manager.save(mainEnvelope);
          }
        });

        return { id: budget.id };
      }
    );
    done();
  };
};
