import {
  GetEnvelopeParamsSchema,
  GetEnvelopeQuerySchema,
  GetEnvelopeResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Envelope } from "../entities/index.js";
import { envelopeView } from "../helpers/envelopeView.js";

export const GetEnvelope = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.get(
      "/api/envelope/:envelopeId",
      async (request, reply): Promise<GetEnvelopeResponseInput> => {
        const user = await request.user();
        const { envelopeId } = GetEnvelopeParamsSchema.parse(request.params);

        const { currentMonth: currentMonthFromQuery } =
          GetEnvelopeQuerySchema.parse(request.query);

        const envelope = await entities.findOne(Envelope, {
          where: {
            userId: user.id,
            id: envelopeId,
          },
          relations: ["allocations", "fromTransfers", "toTransfers"],
        });

        if (!envelope) {
          return reply.status(404).send();
        }

        return envelopeView(envelope, { currentMonth: currentMonthFromQuery });
      }
    );
    done();
  };
};
