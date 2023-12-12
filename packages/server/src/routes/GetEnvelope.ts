import {
  GetEnvelopeParamsSchema,
  GetEnvelopeQuerySchema,
  GetEnvelopeResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Envelope } from "../entities";
import { envelopeView } from "../helpers/envelopeView";

export const GetEnvelope = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.get(
      "/api/budget/:budgetId/envelope/:envelopeId",
      async (request, reply): Promise<GetEnvelopeResponseInput> => {
        const user = await request.user();
        const { budgetId, envelopeId } = GetEnvelopeParamsSchema.parse(
          request.params
        );

        const { currentMonth: currentMonthFromQuery } =
          GetEnvelopeQuerySchema.parse(request.query);

        const envelope = await entities.findOne(Envelope, {
          where: {
            budgetId,
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
