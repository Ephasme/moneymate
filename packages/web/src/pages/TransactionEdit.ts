export type AllocationEdit = {
  id: string | null;
  envelopeId: string | null;
  envelopeName: string | null;
  amount: bigint;
};
export type TransactionEdit = {
  id?: string | null;
  allocations: AllocationEdit[];
  accountId: string | null;
  accountName: string | null;
  date: Date;
  payeeName: string | null;
  amount: bigint;
};
