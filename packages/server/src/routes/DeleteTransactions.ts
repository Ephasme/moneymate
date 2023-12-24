import {
  DeleteTransactionsRequestSchema,
  DeleteTransactionsResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Allocation, Transaction } from "../entities/index.js";

export const DeleteTransactions = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.delete(
      "/api/transaction",
      async (request, reply): Promise<DeleteTransactionsResponse> => {
        const user = await request.user();
        console.log({ body: request.body });
        const idList = DeleteTransactionsRequestSchema.parse(request.body);

        for (const { id } of idList) {
          const transaction = await entities.findOne(Transaction, {
            where: { id, userId: user.id },
            relations: ["allocations"],
          });

          if (transaction) {
            entities.transaction(async (manager) => {
              for (const alloc of transaction.allocations) {
                await manager.delete(Allocation, { id: alloc.id });
              }
              await manager.delete(Transaction, { id, userId: user.id });
            });
          }
        }

        return null;
      }
    );
    done();
  };
};
