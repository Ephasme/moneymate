import {
  EnvelopeViewInput,
  GetEnvelopesParamsSchema,
  GetEnvelopesQuerySchema,
  GetEnvelopesResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import _ from "lodash";
import { EntityManager } from "typeorm";
import { Envelope } from "../entities";
import { envelopeView } from "../helpers/envelopeView";

export const GetEnvelopes = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.get(
      "/api/budget/:budgetId/envelope",
      async (request, reply): Promise<GetEnvelopesResponseInput> => {
        const user = await request.user();
        const { budgetId } = GetEnvelopesParamsSchema.parse(request.params);
        const { currentMonth: currentMonthFromQuery } =
          GetEnvelopesQuerySchema.parse(request.query);

        const envelopes = await entities.find(Envelope, {
          where: {
            budgetId,
            userId: user.id,
          },
          relations: ["allocations", "fromTransfers", "toTransfers"],
        });

        const currentMonth = currentMonthFromQuery ?? new Date();

        return envelopes.map((envelope): EnvelopeViewInput => {
          return envelopeView(envelope, { currentMonth });
        });
      }
    );
    done();
  };
};
