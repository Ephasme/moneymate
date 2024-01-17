import {
  PutTransactionsRequestSchema,
  PutTransactionsResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { isKnownError } from "../helpers/isKnownError.js";
import { SaveTransaction } from "../actions/SaveTransaction.js";
import { Transaction } from "../entities/Transaction.js";

export const PutTransactions = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.put(
      "/api/transaction",
      async (request, reply): Promise<PutTransactionsResponse> => {
        const user = await request.user();
        const list = PutTransactionsRequestSchema.parse(request.body);
        try {
          return await SaveTransaction({ entities })({
            user,
            list,
            getTransaction({ entities, id }) {
              return entities.findOne(Transaction, {
                where: { id, userId: user.id },
                relations: ["allocations"],
              });
            },
          });
        } catch (error) {
          if (isKnownError(error)) {
            return reply.send(error.message).status(error.status);
          }
          throw error;
        }
      }
    );
    done();
  };
};
