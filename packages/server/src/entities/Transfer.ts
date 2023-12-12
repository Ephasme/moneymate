import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";
import { Envelope } from "./Envelope";
import { User } from "./User";
import { Budget } from "./Budget";

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  date!: Date;

  @ManyToOne(() => Envelope, (x) => x.fromTransfers)
  fromEnvelope!: Envelope;

  @Column()
  fromEnvelopeId!: string;

  @ManyToOne(() => Envelope, (x) => x.toTransfers)
  toEnvelope!: Envelope;

  @Column()
  toEnvelopeId!: string;

  @ManyToOne(() => Budget, (x) => x.transfers)
  budget!: Budget;

  @Column()
  budgetId!: string;

  @ManyToOne(() => User, (x) => x.transfers)
  user!: User;

  @Column()
  userId!: string;

  @Column({ type: "bigint" })
  amount!: string;
}
