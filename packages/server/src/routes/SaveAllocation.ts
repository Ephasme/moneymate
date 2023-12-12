import {
  SaveAllocationRequestSchema,
  SaveAllocationResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Allocation } from "../entities";
import { Budget } from "../entities/Budget";
import { getOrNew } from "../helpers/getOrNew";

export const SaveAllocation = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.post(
      "/api/allocation",
      async (request, reply): Promise<SaveAllocationResponse> => {
        const user = await request.user();
        const {
          amount,
          budgetId,
          id: allocationId,
          envelopeId,
          transactionId,
          date,
        } = SaveAllocationRequestSchema.parse(request.body);

        const budget = await entities.findOneBy(Budget, { id: budgetId });
        if (!budget) {
          return reply.status(404).send({ message: "Budget not found" });
        }

        const [allocation] = await getOrNew(
          entities,
          user,
          Allocation,
          allocationId
        );

        allocation.budgetId = budget.id;
        allocation.envelopeId = envelopeId;
        allocation.transactionId = transactionId;
        allocation.date = date ?? new Date();
        allocation.amount = amount.toString();

        await entities.save(Allocation, allocation);

        return { id: allocation.id };
      }
    );
    done();
  };
};
