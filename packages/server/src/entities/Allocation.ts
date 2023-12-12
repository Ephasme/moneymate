import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";
import { Envelope } from "./Envelope";
import { User } from "./User";
import { Budget } from "./Budget";

@Entity()
export class Allocation {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Envelope, (x) => x.allocations)
  envelope!: Envelope;

  @Column()
  envelopeId!: string;

  @ManyToOne(() => Budget, (x) => x.allocations)
  budget!: Budget;

  @Column()
  budgetId!: string;

  @ManyToOne(() => Transaction, (x) => x.allocations)
  transaction!: Transaction;

  @Column()
  transactionId!: string;

  @ManyToOne(() => User, (x) => x.allocations)
  user!: User;

  @Column()
  userId!: string;

  @Column({ type: "bigint" })
  amount!: string;

  @Column()
  date!: Date;
}
