import {
  EnvelopeGroupViewInput,
  GetEnvelopeGroupsParamsSchema,
  GetEnvelopeGroupsQuerySchema,
  GetEnvelopeGroupsResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { EnvelopeGroup } from "../entities";
import { envelopeGroupView } from "../helpers/envelopeGroupView";
import { AllocationRepository } from "../services/AllocationRepository";
import { TransferRepository } from "../services/TransferRepository";

export const GetEnvelopeGroups = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.get(
      "/api/budget/:budgetId/envelope-group",
      async (request, reply): Promise<GetEnvelopeGroupsResponseInput> => {
        const user = await request.user();
        const { budgetId } = GetEnvelopeGroupsParamsSchema.parse(
          request.params
        );

        const envelopeGroups = await entities.find(EnvelopeGroup, {
          where: {
            budgetId,
            userId: user.id,
          },
          relations: ["envelopes"],
        });

        return envelopeGroups.map((envelopeGroup): EnvelopeGroupViewInput => {
          return envelopeGroupView(envelopeGroup);
        });
      }
    );
    done();
  };
};
