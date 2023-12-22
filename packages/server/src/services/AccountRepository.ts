import { EntityManager } from "typeorm";

export class AccountRepository {
  constructor(private readonly entities: EntityManager) {}

  private getAccountQuery(props: { userId: string }) {
    return this.entities
      .createQueryBuilder()
      .select("a.*")
      .addSelect(
        "CAST(SUM(CASE WHEN t.status = 'reconciled' THEN t.amount ELSE 0 END) AS SIGNED INTEGER)",
        "reconciledBalance"
      )
      .addSelect(
        "CAST(SUM(CASE WHEN t.status = 'cleared' THEN t.amount ELSE 0 END) AS SIGNED INTEGER)",
        "clearedBalance"
      )
      .addSelect(
        "CAST(SUM(CASE WHEN t.status = 'pending' THEN t.amount ELSE 0 END) AS SIGNED INTEGER)",
        "pendingBalance"
      )
      .addSelect("CAST(SUM(t.amount) AS SIGNED INTEGER)", "balance")
      .from("Account", "a")
      .leftJoin("Transaction", "t", "t.accountId = a.id")
      .andWhere("a.userId = :userId", { userId: props.userId })
      .groupBy("a.userId, a.id");
  }

  async findMany(userId: string) {
    const accounts = await this.getAccountQuery({ userId }).getRawMany();

    return accounts.map((account) => ({
      id: account.id,
      name: account.name,
      clearedBalance: account.clearedBalance,
      pendingBalance: account.pendingBalance,
    }));
  }

  async findOne(id: string, userId: string) {
    const account = await this.getAccountQuery({ userId })
      .where("a.id = :accountId", { accountId: id })
      .getRawOne();

    if (!account) {
      return null;
    }

    return {
      id: account.id,
      name: account.name,
      clearedBalance: account.clearedBalance,
      pendingBalance: account.pendingBalance,
    };
  }
}
