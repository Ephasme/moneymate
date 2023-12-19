import {
  EditEnvelopeGroupParamsSchema,
  EditEnvelopeGroupRequestSchema,
  EditEnvelopeGroupResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { EnvelopeGroup } from "../entities/EnvelopeGroup.js";

export const EditEnvelopeGroup = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.put(
      "/api/envelope-group/:envelopeGroupId",
      async (request, reply): Promise<EditEnvelopeGroupResponse> => {
        const user = await request.user();
        const { envelopeGroupId } = EditEnvelopeGroupParamsSchema.parse(
          request.params
        );
        const { name, hidden } = EditEnvelopeGroupRequestSchema.parse(
          request.body
        );

        const envelopeGroup = await entities.findOneBy(EnvelopeGroup, {
          id: envelopeGroupId,
          userId: user.id,
        });
        if (!envelopeGroup) {
          return reply.status(404).send({ message: "EnvelopeGroup not found" });
        }
        if (name) envelopeGroup.name = name;
        if (hidden !== undefined) envelopeGroup.isHidden = hidden;

        await entities.save(envelopeGroup);

        return { id: envelopeGroupId };
      }
    );
    done();
  };
};
