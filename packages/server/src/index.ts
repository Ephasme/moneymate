import cors from "@fastify/cors";
import env from "env-var";
import Fastify from "fastify";
import dataSource from "./datasource.config";
import { User } from "./entities";
import { Routes } from "./routes";
import { Authenticator } from "./services/Authenticator";
import { AllocationRepository } from "./services/AllocationRepository";
import { TransferRepository } from "./services/TransferRepository";
import { BudgetRepository } from "./services/BudgetRepository";

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
