import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Envelope } from "./Envelope.js";
import { User } from "./User.js";
import { Budget } from "./Budget.js";

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "datetime" })
  date!: Date;

  @ManyToOne(() => Envelope, (x) => x.fromTransfers)
  fromEnvelope!: Relation<Envelope>;

  @Column({ type: "varchar" })
  fromEnvelopeId!: string;

  @ManyToOne(() => Envelope, (x) => x.toTransfers)
  toEnvelope!: Relation<Envelope>;

  @Column({ type: "varchar" })
  toEnvelopeId!: string;

  @ManyToOne(() => Budget, (x) => x.transfers)
  budget!: Relation<Budget>;

  @Column({ type: "varchar" })
  budgetId!: string;

  @ManyToOne(() => User, (x) => x.transfers)
  user!: Relation<User>;

  @Column({ type: "varchar" })
  userId!: string;

  @Column({ type: "bigint" })
  amount!: string;
}
