import {
  DeleteEnvelopeGroupParamsSchema,
  DeleteEnvelopeGroupResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { EnvelopeGroup } from "../entities/index.js";

export const DeleteEnvelopeGroup = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.delete(
      "/api/envelope-group/:envelopeGroupId",
      async (request, reply): Promise<DeleteEnvelopeGroupResponse> => {
        const user = await request.user();
        const { envelopeGroupId } = DeleteEnvelopeGroupParamsSchema.parse(
          request.params
        );

        await entities.delete(EnvelopeGroup, {
          id: envelopeGroupId,
          userId: user.id,
        });

        return { id: envelopeGroupId };
      }
    );
    done();
  };
};
