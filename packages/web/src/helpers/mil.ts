import Big from "big.js";

export function mult(input: string): bigint {
  const b = Big(input);
  return BigInt(b.mul(100).toString());
}

export function divStr(
  input: bigint | null,
  {
    currency = "EUR",
  }: {
    currency?: "EUR";
  } = {}
): string | null {
  if (!input) return null;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(divToNumber(input));
}

export function divToNumber(input: bigint): number {
  const b = Big(input.toString());
  return b.div(100).toNumber();
}
