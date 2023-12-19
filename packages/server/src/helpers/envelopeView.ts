import { EnvelopeViewInput } from "@moneymate/shared";
import { Envelope } from "../entities/index.js";
import * as dateFns from "date-fns";

function enrichEnvelope(
  envelope: Envelope,
  {
    currentMonth = new Date(),
  }: {
    currentMonth?: Date;
  } = {}
) {
  const endOfMonth = dateFns.endOfDay(dateFns.endOfMonth(currentMonth));
  const toTransfersThisMonth = envelope.toTransfers
    .filter((transfer) => dateFns.isSameMonth(transfer.date, currentMonth))
    .reduce((acc, transfer) => acc + BigInt(transfer.amount), 0n);

  const fromTransfersThisMonth = envelope.fromTransfers
    .filter((transfer) => dateFns.isSameMonth(transfer.date, currentMonth))
    .reduce((acc, transfer) => acc + BigInt(transfer.amount), 0n);

  const toTransfersUpToThisMonth = envelope.toTransfers
    .filter((transfer) => dateFns.isBefore(transfer.date, endOfMonth))
    .reduce((acc, transfer) => acc + BigInt(transfer.amount), 0n);

  const fromTransfersUpToThisMonth = envelope.fromTransfers
    .filter((transfer) => dateFns.isBefore(transfer.date, endOfMonth))
    .reduce((acc, transfer) => acc + BigInt(transfer.amount), 0n);

  const allocationsThisMonth = envelope.allocations
    .filter((allocation) => dateFns.isSameMonth(allocation.date, currentMonth))
    .reduce((acc, allocation) => acc + BigInt(allocation.amount), 0n);

  const allocationsUpToThisMonth = envelope.allocations
    .filter((allocation) => dateFns.isBefore(allocation.date, endOfMonth))
    .reduce((acc, allocation) => acc + BigInt(allocation.amount), 0n);

  return {
    activity: allocationsThisMonth.toString(),
    allocated: (toTransfersThisMonth - fromTransfersThisMonth).toString(),
    balance: (
      allocationsUpToThisMonth +
      toTransfersUpToThisMonth -
      fromTransfersUpToThisMonth
    ).toString(),
  };
}

export const envelopeView = (
  envelope: Envelope,
  options?: { currentMonth?: Date }
): EnvelopeViewInput => {
  return {
    id: envelope.id,
    name: envelope.name,
    allocations: envelope.allocations.map((allocation) => ({
      id: allocation.id,
      amount: allocation.amount,
    })),
    isDefault: envelope.isDefault,
    isHidden: envelope.isHidden,
    parentId: envelope.parentId,
    ...enrichEnvelope(envelope, options),
  };
};
