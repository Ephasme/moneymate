import {
  GetAllocationParamsSchema,
  GetAllocationResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Allocation } from "../entities/index.js";
import { allocationView } from "../helpers/allocationView.js";

export const GetAllocation = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.get(
      "/api/allocation/:allocationId",
      async (request, reply): Promise<GetAllocationResponseInput> => {
        const user = await request.user();
        const { allocationId } = GetAllocationParamsSchema.parse(
          request.params
        );

        const allocation = await entities.findOneBy(Allocation, {
          userId: user.id,
          id: allocationId,
        });

        if (!allocation) {
          return reply.status(404).send();
        }

        return allocationView(allocation);
      }
    );
    done();
  };
};
