import {
  PatchEnvelopesRequestSchema,
  PatchEnvelopesResponseInput,
  processPatch,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Envelope } from "../entities/index.js";

export const PatchEnvelopes = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.patch(
      "/api/envelope",
      async (request, reply): Promise<PatchEnvelopesResponseInput> => {
        const user = await request.user();
        const list = PatchEnvelopesRequestSchema.parse(request.body);

        for (const {
          description,
          id,
          budgetId,
          emoji,
          hidden,
          name,
          parentId,
        } of list) {
          const envelope = await entities.findOne(Envelope, {
            where: { id, userId: user.id },
          });
          if (!envelope) {
            return reply.status(404).send({ message: "Transaction not found" });
          }

          envelope.budgetId = budgetId ?? envelope.budgetId;
          envelope.description = processPatch(
            description,
            envelope.description
          );
          envelope.emoji = processPatch(emoji, envelope.emoji);
          envelope.isHidden = processPatch(hidden, envelope.isHidden) ?? false;
          envelope.name = name ?? envelope.name;
          envelope.parentId = processPatch(parentId, envelope.parentId);

          await entities.save(envelope);
        }
        return null;
      }
    );
    done();
  };
};
