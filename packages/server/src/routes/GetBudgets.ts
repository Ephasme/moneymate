import { GetBudgetsResponseInput } from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Budget } from "../entities/Budget.js";

export const GetBudgets = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.get(
      "/api/budget",
      async (request, reply): Promise<GetBudgetsResponseInput> => {
        const user = await request.user();

        const budgets = await entities.findBy(Budget, {
          userId: user.id,
        });

        return budgets.map((budget) => ({
          id: budget.id,
          name: budget.name,
          unallocatedAmount: "0",
        }));
      }
    );
    done();
  };
};
