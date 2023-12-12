import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TransactionStatus, TransactionStatuses } from "@moneymate/shared";
import { Account } from "./Account";
import { Allocation } from "./Allocation";
import { Payee } from "./Payee";
import { Budget } from "./Budget";
import { User } from "./User";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: TransactionStatuses, default: "pending" })
  status!: TransactionStatus;

  @ManyToOne(() => Account, (x) => x.transactions)
  account!: Account;

  @Column()
  accountId!: string;

  @ManyToOne(() => Budget, (x) => x.transactions)
  budget!: Budget;

  @Column()
  budgetId!: string;

  @ManyToOne(() => User, (x) => x.transactions)
  user!: User;

  @Column()
  userId!: string;

  @Column({ type: "bigint" })
  amount!: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Payee, { nullable: true })
  payee?: Payee;

  @Column({ nullable: true })
  payeeId?: string;

  @Column()
  date!: Date;

  @OneToMany(() => Allocation, (x) => x.transaction)
  allocations!: Allocation[];
}
