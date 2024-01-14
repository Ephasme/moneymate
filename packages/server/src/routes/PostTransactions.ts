import {
  PostTransactionsRequestSchema,
  PostTransactionsResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { SaveTransaction } from "../actions/SaveTransaction.js";
import { isKnownError } from "../helpers/isKnownError.js";

export const PostTransactions = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.post(
      "/api/transaction",
      async (request, reply): Promise<PostTransactionsResponse> => {
        const user = await request.user();
        const list = PostTransactionsRequestSchema.parse(request.body);
        try {
          return await SaveTransaction({ entities })({ user, list });
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
