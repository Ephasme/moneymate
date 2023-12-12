import { EntityManager } from "typeorm";
import { Transfer } from "../entities";
import * as dateFns from "date-fns";

export class TransferRepository {
  constructor(private readonly entities: EntityManager) {}

  getTransfersForMonth(props: {
    budgetId: string;
    userId: string;
    month: Date;
  }) {
    return this.entities
      .createQueryBuilder(Transfer, "t")
      .where("t.budgetId = :budgetId", { budgetId: props.budgetId })
      .andWhere("t.userId = :userId", { userId: props.userId })
      .andWhere("t.date >= :startDate", {
        startDate: dateFns.startOfMonth(props.month),
      })
      .andWhere("t.date <= :endDate", {
        endDate: dateFns.endOfMonth(props.month),
      })
      .getMany();
  }

  getTransfersUpTo(props: { budgetId: string; userId: string; month: Date }) {
    return this.entities
      .createQueryBuilder(Transfer, "t")
      .where("t.budgetId = :budgetId", { budgetId: props.budgetId })
      .andWhere("t.userId = :userId", { userId: props.userId })
      .andWhere("t.date <= :startDate", {
        startDate: dateFns.endOfMonth(props.month),
      })
      .getMany();
  }
}
