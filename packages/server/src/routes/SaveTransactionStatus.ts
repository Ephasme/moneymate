import {
  SaveTransactionStatusParamsSchema,
  SaveTransactionStatusRequestSchema,
  SaveTransactionStatusResponse,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Transaction } from "../entities/index.js";

export const SaveTransactionStatus = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.put(
      "/api/transaction/:id/status",
      async (request, reply): Promise<SaveTransactionStatusResponse> => {
        const user = await request.user();

        const { id } = SaveTransactionStatusParamsSchema.parse(request.params);
        const { status: newStatus } = SaveTransactionStatusRequestSchema.parse(
          request.body
        );

        console.log("newStatus", { status: newStatus });
        await entities.update(Transaction, { id }, { status: newStatus });

        return { id };
      }
    );
    done();
  };
};
