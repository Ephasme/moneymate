import { DataSource } from "typeorm";
import {
  User,
  Allocation,
  Transaction,
  Envelope,
  Account,
  Payee,
  Transfer,
} from "./entities/index.js";
import { Budget } from "./entities/Budget.js";
import env from "env-var";
import { EnvelopeGroup } from "./entities/EnvelopeGroup.js";

const DB_HOST = env.get("DB_HOST").required().asString();
const DB_PORT = env.get("DB_PORT").required().asPortNumber();
const DB_USERNAME = env.get("DB_USERNAME").required().asString();
const DB_PASSWORD = env.get("DB_PASSWORD").required().asString();

export default new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: "moneymate",

  synchronize: true,

  entities: [
    User,
    Allocation,
    Envelope,
    EnvelopeGroup,
    Account,
    Transaction,
    Payee,
    Budget,
    Transfer,
  ],
});
