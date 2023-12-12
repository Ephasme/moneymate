import {
  DeleteAllocationParamsSchema,
  DeleteAllocationResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";

export const DeleteAllocation = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.delete(
      "/api/allocation/:allocationId",
      async (request, reply): Promise<DeleteAllocationResponse> => {
        const user = await request.user();
        const { allocationId } = DeleteAllocationParamsSchema.parse(
          request.params
        );

        await entities.delete("Allocation", {
          id: allocationId,
          userId: user.id,
        });

        return { id: allocationId };
      }
    );
    done();
  };
};
