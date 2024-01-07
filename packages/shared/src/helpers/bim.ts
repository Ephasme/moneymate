function sumBy<T>(array: T[], iteratee: (value: T) => bigint): bigint {
  return array.reduce((sum, value) => sum + iteratee(value), BigInt(0));
}

function abs(value: bigint): bigint {
  return value < 0 ? -value : value;
}

export const bim = {
  sumBy,
  abs,
};
