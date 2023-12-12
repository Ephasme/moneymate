import Big from "big.js";

export function mult(input: string): bigint {
  const b = Big(input);
  return BigInt(b.mul(100).toString());
}

export function divStr(input: bigint | null): string | null {
  if (!input) return null;
  const b = Big(input.toString());
  return b.div(100).toString();
}

export function divToNumber(input: bigint): number {
  const b = Big(input.toString());
  return b.div(100).toNumber();
}
