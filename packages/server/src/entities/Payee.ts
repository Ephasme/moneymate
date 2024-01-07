import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { User } from "./User.js";
import { Budget } from "./Budget.js";

@Entity()
export class Payee {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  name!: string;

  @ManyToOne(() => User, (x) => x.payees)
  user!: Relation<User>;

  @Column({ type: "varchar" })
  userId!: string;

  @ManyToOne(() => Budget, (x) => x.payees)
  budget!: Relation<Budget>;

  @Column({ type: "varchar" })
  budgetId!: string;
}
