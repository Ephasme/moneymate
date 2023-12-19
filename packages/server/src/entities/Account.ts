import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Budget } from "./Budget.js";
import { Transaction } from "./Transaction.js";
import { User } from "./User.js";

@Entity()
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @OneToMany(() => Transaction, (x) => x.account)
  transactions!: Relation<Transaction>[];

  @ManyToOne(() => Budget, (x) => x.accounts)
  budget!: Relation<Budget>;

  @Column({ type: "varchar" })
  budgetId!: string;

  @ManyToOne(() => User, (x) => x.accounts)
  user!: Relation<User>;

  @Column({ type: "varchar" })
  userId!: string;
}
