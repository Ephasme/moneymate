import {
  PostEnvelopesRequestSchema,
  PostEnvelopesResponse,
} from "@moneymate/shared";
import { randomUUID } from "crypto";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";
import { Envelope } from "../entities/index.js";

export const PostEnvelopes = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _ignored, done) => {
    server.post(
      "/api/envelope",
      async (request, reply): Promise<PostEnvelopesResponse> => {
        const user = await request.user();
        const list = PostEnvelopesRequestSchema.parse(request.body);

        console.log("test2");

        for (const { id, hidden, name, description, emoji, budgetId } of list) {
          const envelope = new Envelope();

          console.log("test", { emoji });

          envelope.id = randomUUID() ?? id;
          envelope.userId = user.id;
          envelope.budgetId = budgetId;
          envelope.isHidden = hidden ?? false;
          envelope.name = name ?? "New Envelope";
          envelope.description = description ?? "A new envelope";
          envelope.emoji = emoji ?? "💰";

          await entities.save(Envelope, envelope);
        }
        return null;
      }
    );
    done();
  };
};
