import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Transaction } from "./Transaction.js";
import { Envelope } from "./Envelope.js";
import { User } from "./User.js";
import { Budget } from "./Budget.js";

@Entity()
export class Allocation {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Envelope, (x) => x.allocations)
  envelope!: Relation<Envelope>;

  @Column({ type: "varchar" })
  envelopeId!: string;

  @ManyToOne(() => Budget, (x) => x.allocations)
  budget!: Relation<Budget>;

  @Column({ type: "varchar" })
  budgetId!: string;

  @ManyToOne(() => Transaction, (x) => x.allocations)
  transaction!: Relation<Transaction>;

  @Column({ type: "varchar" })
  transactionId!: string;

  @ManyToOne(() => User, (x) => x.allocations)
  user!: Relation<User>;

  @Column({ type: "varchar" })
  userId!: string;

  @Column({ type: "bigint" })
  amount!: string;

  @Column({ type: "datetime" })
  date!: Date;
}
