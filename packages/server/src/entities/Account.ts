import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Budget } from "./Budget";
import { Transaction } from "./Transaction";
import { User } from "./User";

@Entity()
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => Transaction, (x) => x.account)
  transactions!: Transaction[];

  @ManyToOne(() => Budget, (x) => x.accounts)
  budget!: Budget;

  @Column()
  budgetId!: string;

  @ManyToOne(() => User, (x) => x.accounts)
  user!: User;

  @Column()
  userId!: string;
}
