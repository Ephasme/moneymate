import { RecurrencePeriod } from "@moneymate/shared";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
} from "typeorm";
import { Transaction } from "./Transaction.js";

@Entity()
export class Recurrence {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: RecurrencePeriod })
  period!: RecurrencePeriod;

  @Column({ type: "int" })
  frequency!: number;

  @Column({ type: "datetime" })
  startDate!: Date;

  @Column({ type: "datetime" })
  currentDate!: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.recurrence)
  transactions!: Relation<Transaction>[];
}
