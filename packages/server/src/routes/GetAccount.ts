import {
  GetAccountParamsSchema,
  GetAccountResponseInput,
} from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { AccountRepository } from "../services/AccountRepository.js";

export const GetAccount = ({
  accountRepository,
}: {
  accountRepository: AccountRepository;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.get(
      "/api/account/:accountId",
      async (request, reply): Promise<GetAccountResponseInput> => {
        const user = await request.user();
        const { accountId } = GetAccountParamsSchema.parse(request.params);

        const account = await accountRepository.findOne(accountId, user.id);

        if (!account) {
          return reply.status(404).send({ message: "Account not found" });
        }

        return account;
      }
    );
    done();
  };
};
