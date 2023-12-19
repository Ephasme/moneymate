import {
  GetAccountParamsSchema,
  GetAccountResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { EntityManager } from "typeorm";

export const GetAccount = ({
  entities,
}: {
  entities: EntityManager;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.get(
      "/api/account/:accountId",
      async (request, reply): Promise<GetAccountResponseInput> => {
        const user = await request.user();
        const { accountId } = GetAccountParamsSchema.parse(request.params);

        const account = await entities
          .createQueryBuilder()
          .select("a.*")
          .addSelect(
            "CAST(SUM(CASE WHEN t.status = 'reconciled' THEN t.amount ELSE 0 END) AS SIGNED INTEGER)",
            "reconciledBalance"
          )
          .addSelect(
            "CAST(SUM(CASE WHEN t.status = 'cleared' THEN t.amount ELSE 0 END) AS SIGNED INTEGER)",
            "clearedBalance"
          )
          .addSelect(
            "CAST(SUM(CASE WHEN t.status = 'pending' THEN t.amount ELSE 0 END) AS SIGNED INTEGER)",
            "pendingBalance"
          )
          .addSelect("CAST(SUM(t.amount) AS SIGNED INTEGER)", "balance")
          .from("Account", "a")
          .leftJoin("Transaction", "t", "t.accountId = a.id")
          .where("a.id = :accountId", { accountId })
          .andWhere("a.userId = :userId", { userId: user.id })
          .groupBy("a.userId, a.id")
          .getRawOne();

        if (!account) {
          return reply.status(404).send({ message: "Account not found" });
        }

        return {
          id: account.id,
          name: account.name,
          clearedBalance: account.clearedBalance,
          pendingBalance: account.pendingBalance,
        };
      }
    );
    done();
  };
};
