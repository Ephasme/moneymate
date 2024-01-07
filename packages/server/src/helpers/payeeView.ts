import { PayeeViewInput } from "@moneymate/shared";
import { Payee } from "../entities/index.js";

export const payeeView = (a: Payee): PayeeViewInput => ({
  id: a.id,
  name: a.name,
});
