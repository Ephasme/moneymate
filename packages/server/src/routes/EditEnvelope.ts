import {
  EditEnvelopeParamsSchema,
  EditEnvelopeRequestSchema,
  EditEnvelopeResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Envelope } from "../entities/Envelope.js";

export const EditEnvelope = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.put(
      "/api/envelope/:envelopeId",
      async (request, reply): Promise<EditEnvelopeResponse> => {
        const user = await request.user();
        const { envelopeId } = EditEnvelopeParamsSchema.parse(request.params);
        const { name, hidden } = EditEnvelopeRequestSchema.parse(request.body);

        const envelope = await entities.findOneBy(Envelope, {
          id: envelopeId,
          userId: user.id,
        });
        if (!envelope) {
          return reply.status(404).send({ message: "Envelope not found" });
        }
        if (name) envelope.name = name;
        if (hidden !== undefined) envelope.isHidden = hidden;

        await entities.save(envelope);

        return { id: envelopeId };
      }
    );
    done();
  };
};
