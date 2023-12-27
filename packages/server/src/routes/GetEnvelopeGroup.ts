import {
  GetEnvelopeGroupParamsSchema,
  GetEnvelopeGroupResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { EnvelopeGroup } from "../entities/index.js";
import { envelopeGroupView } from "../helpers/envelopeGroupView.js";

export const GetEnvelopeGroup = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.get(
      "/api/envelope-group/:envelopeGroupId",
      async (request, reply): Promise<GetEnvelopeGroupResponseInput> => {
        const user = await request.user();
        const { envelopeGroupId } = GetEnvelopeGroupParamsSchema.parse(
          request.params
        );

        const envelopeGroup = await entities.findOne(EnvelopeGroup, {
          where: {
            userId: user.id,
            id: envelopeGroupId,
          },
          relations: ["envelopes"],
        });

        if (!envelopeGroup) {
          return reply.status(404).send();
        }

        return envelopeGroupView(envelopeGroup);
      }
    );
    done();
  };
};
