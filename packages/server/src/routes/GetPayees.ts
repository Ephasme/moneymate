import {
  GetPayeesParamsSchema,
  GetPayeesResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Payee } from "../entities/index.js";
import { payeeView } from "../helpers/payeeView.js";

export const GetPayees = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.get(
      "/api/budget/:budgetId/payee",
      async (request, _reply): Promise<GetPayeesResponseInput> => {
        const user = await request.user();
        const { budgetId } = GetPayeesParamsSchema.parse(request.params);

        const payees = await entities.find(Payee, {
          where: { budgetId, userId: user.id },
        });

        return payees.map(payeeView);
      }
    );
    done();
  };
};
