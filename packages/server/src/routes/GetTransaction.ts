import {
  GetTransactionParamsSchema,
  GetTransactionResponse,
  GetTransactionResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Transaction } from "../entities/index.js";
import { transactionView } from "../helpers/transactionView.js";

export const GetTransaction = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.get(
      "/api/transaction/:transactionId",
      async (request, reply): Promise<GetTransactionResponseInput> => {
        const user = await request.user();
        const { transactionId } = GetTransactionParamsSchema.parse(
          request.params
        );

        const transaction = await entities.findOne(Transaction, {
          where: {
            userId: user.id,
            id: transactionId,
          },
          relations: [
            "payee",
            "account",
            "allocations",
            "allocations.envelope",
          ],
        });

        if (!transaction) {
          return reply.status(404).send();
        }

        return transactionView(transaction);
      }
    );
    done();
  };
};
