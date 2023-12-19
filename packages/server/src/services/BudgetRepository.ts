import { EntityManager } from "typeorm";
import { Transaction } from "../entities/index.js";
import * as dateFns from "date-fns";

export class BudgetRepository {
  constructor(private readonly entities: EntityManager) {}
  async getTotalAmounts(props: {
    budgetId: string;
    userId: string;
    currentMonth?: Date;
  }) {
    const currentMonth = dateFns.endOfMonth(props.currentMonth ?? new Date());
    const result = await this.entities
      .createQueryBuilder()
      .select("SUM(t2.amount)", "totalAmount")
      .addSelect("SUM(t2.allocatedAmount)", "totalAllocatedAmount")
      .from((qb) => {
        return qb
          .select("t.id", "id")
          .addSelect("t.amount", "amount")
          .addSelect("SUM(a.amount)", "allocatedAmount")
          .from(Transaction, "t")
          .innerJoin("t.allocations", "a")
          .where("t.budgetId = :budgetId")
          .andWhere("t.userId = :userId")
          .andWhere("t.date <= :currentMonth")
          .groupBy("t.id");
      }, "t2")
      .setParameters({
        budgetId: props.budgetId,
        userId: props.userId,
        currentMonth,
      })
      .getRawOne<{ totalAmount: string; totalAllocatedAmount: string }>();
    return {
      totalAmount: BigInt(result?.totalAmount || "0"),
      totalAllocatedAmount: BigInt(result?.totalAllocatedAmount || "0"),
    };
  }
}
