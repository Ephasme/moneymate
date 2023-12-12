import {
  GetBudgetParamsSchema,
  GetBudgetQuerySchema,
  GetBudgetResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Budget } from "../entities/Budget";
import { BudgetRepository } from "../services/BudgetRepository";

export const GetBudget = ({
  entities,
  budgetRepository,
}: {
  entities: EntityManager;
  budgetRepository: BudgetRepository;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.get(
      "/api/budget/:budgetId",
      async (request, reply): Promise<GetBudgetResponseInput> => {
        const user = await request.user();
        const { budgetId } = GetBudgetParamsSchema.parse(request.params);
        const { currentMonth } = GetBudgetQuerySchema.parse(request.query);

        const { totalAmount, totalAllocatedAmount } =
          await budgetRepository.getTotalAmounts({
            budgetId,
            userId: user.id,
            currentMonth,
          });

        const budget = await entities.findOneBy(Budget, {
          id: budgetId,
          userId: user.id,
        });

        if (!budget) {
          return reply.status(404).send();
        }

        return {
          id: budget.id,
          name: budget.name,
          unallocatedAmount: (totalAmount - totalAllocatedAmount).toString(),
        };
      }
    );
    done();
  };
};
