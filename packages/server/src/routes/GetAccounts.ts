import { GetAccountsResponseInput } from "@moneymate/shared";
import { FastifyPluginCallback } from "fastify";
import { AccountRepository } from "../services/AccountRepository.js";

export const GetAccounts = ({
  accountRepository,
}: {
  accountRepository: AccountRepository;
}): FastifyPluginCallback => {
  return (server, _, done) => {
    server.get(
      "/api/budget/:budgetId/account",
      async (request, reply): Promise<GetAccountsResponseInput> => {
        const user = await request.user();
        return await accountRepository.findMany(user.id);
      }
    );
    done();
  };
};
