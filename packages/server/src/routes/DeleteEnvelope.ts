import {
  DeleteEnvelopeParamsSchema,
  DeleteEnvelopeResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Envelope } from "../entities/index.js";

export const DeleteEnvelope = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.delete(
      "/api/envelope/:envelopeId",
      async (request, reply): Promise<DeleteEnvelopeResponse> => {
        const user = await request.user();
        const { envelopeId } = DeleteEnvelopeParamsSchema.parse(request.params);

        await entities.delete(Envelope, {
          id: envelopeId,
          userId: user.id,
        });

        return { id: envelopeId };
      }
    );
    done();
  };
};
