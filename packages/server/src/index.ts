import "reflect-metadata";
import cors from "@fastify/cors";
import env from "env-var";
import Fastify from "fastify";
import dataSource from "./datasource.config.js";
import { User } from "./entities/index.js";
import { Routes } from "./routes/index.js";
import { Authenticator } from "./services/Authenticator.js";
import { AllocationRepository } from "./services/AllocationRepository.js";
import { TransferRepository } from "./services/TransferRepository.js";
import { BudgetRepository } from "./services/BudgetRepository.js";
import { AccountRepository } from "./services/AccountRepository.js";

declare module "fastify" {
  interface FastifyRequest {
    maybeUser(): Promise<User | undefined>;
    user(): Promise<User>;
    // Can throw errors.
    authenticate(): Promise<void>;
  }
}

const JWT_SECRET = env.get("JWT_SECRET").required().asString();

async function main() {
  const server = Fastify({
    logger: true,
  });
  await server.register(cors, { origin: "*" });

  dataSource.initialize().catch((error) => {
    console.error("Failed to connect to database.");
    console.error(error);
  });

  const entities = dataSource.createEntityManager();
  Authenticator({ entities })(server);

  server.register(
    Routes({
      entities,
      JWT_SECRET,
      allocationRepository: new AllocationRepository(entities),
      transferRepository: new TransferRepository(entities),
      budgetRepository: new BudgetRepository(entities),
      accountRepository: new AccountRepository(entities),
    })
  );

  server.listen({ port: 3000 }, (error, address) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
    console.log(server.printRoutes());
  });
}

main();
