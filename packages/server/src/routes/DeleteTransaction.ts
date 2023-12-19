import {
  DeleteTransactionParamsSchema,
  DeleteTransactionResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Transaction } from "../entities/index.js";

export const DeleteTransaction = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.delete(
      "/api/transaction/:transactionId",
      async (request, reply): Promise<DeleteTransactionResponse> => {
        const user = await request.user();
        const { transactionId } = DeleteTransactionParamsSchema.parse(
          request.params
        );

        const transaction = await entities.findOne(Transaction, {
          where: {
            id: transactionId,
            userId: user.id,
          },
          relations: ["allocations"],
        });
        if (!transaction) {
          return reply.status(404).send({ message: "Transaction not found" });
        }

        entities.transaction(async (manager) => {
          console.log(transaction.allocations);
          for (const alloc of transaction.allocations) {
            await manager.delete("Allocation", { id: alloc.id });
          }
          await manager.delete("Transaction", {
            id: transactionId,
            userId: user.id,
          });
        });

        return { id: transactionId };
      }
    );
    done();
  };
};
