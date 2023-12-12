export const sumBy = <T>(list: T[], fn: (t: T) => string): bigint => {
  let result: bigint = 0n;
  for (const item of list) {
    const itemN: bigint = BigInt(fn(item));
    result = result + itemN;
  }
  return result;
};
