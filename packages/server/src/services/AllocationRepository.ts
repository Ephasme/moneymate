import * as dateFns from "date-fns";
import { EntityManager } from "typeorm";
import { Allocation } from "../entities";
import _ from "lodash";

export class AllocationRepository {
  constructor(private entities: EntityManager) {}

  private allocationsWithTransactions(props: {
    budgetId: string;
    userId: string;
  }) {
    return this.entities
      .createQueryBuilder(Allocation, "a")
      .innerJoin("a.transaction", "t")
      .where("a.budgetId = :budgetId", { budgetId: props.budgetId })
      .andWhere("a.userId = :userId", { userId: props.userId });
  }

  async getAllocationsUpTo(props: {
    budgetId: string;
    userId: string;
    month: Date;
  }) {
    return this.allocationsWithTransactions(props)
      .andWhere("t.date <= :endDate", {
        endDate: dateFns.lastDayOfMonth(props.month),
      })
      .getMany();
  }

  async getAllocationsForMonth(props: {
    budgetId: string;
    userId: string;
    month: Date;
  }) {
    return this.allocationsWithTransactions(props)
      .andWhere("t.date >= :startDate", {
        startDate: dateFns.startOfMonth(props.month),
      })
      .andWhere("t.date <= :endDate", {
        endDate: dateFns.endOfMonth(props.month),
      })
      .getMany();
  }
}
