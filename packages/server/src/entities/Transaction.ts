import { TransactionStatus, TransactionStatuses } from "@moneymate/shared";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Account } from "./Account.js";
import { Allocation } from "./Allocation.js";
import { Budget } from "./Budget.js";
import { Payee } from "./Payee.js";
import { Recurrence } from "./Recurrence.js";
import { User } from "./User.js";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: TransactionStatuses, default: "pending" })
  status!: Relation<TransactionStatus>;

  @ManyToOne(() => Account, (x) => x.transactions)
  account!: Relation<Account>;

  @Column({ type: "varchar" })
  accountId!: string;

  @ManyToOne(() => Budget, (x) => x.transactions)
  budget!: Relation<Budget>;

  @Column({ type: "varchar" })
  budgetId!: string;

  @ManyToOne(() => User, (x) => x.transactions)
  user!: Relation<User>;

  @Column({ type: "varchar" })
  userId!: string;

  @Column({ type: "bigint" })
  amount!: string;

  @Column({ type: "varchar", nullable: true })
  description?: string;

  @ManyToOne(() => Payee, { nullable: true })
  payee?: Relation<Payee>;

  @Column({ type: "varchar", nullable: true })
  payeeId?: string;

  @Column({ type: "datetime" })
  date!: Date;

  @OneToMany(() => Allocation, (x) => x.transaction)
  allocations!: Relation<Allocation>[];

  @ManyToOne(() => Recurrence, { nullable: true })
  recurrence!: Relation<Recurrence> | null;

  @Column({ type: "varchar", nullable: true })
  recurrenceId?: string;
}
