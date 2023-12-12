import { divToNumber } from "./mil";

export const formatCurrency = (value: bigint) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(divToNumber(value));
};
