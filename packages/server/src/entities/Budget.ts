import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Transaction } from "./Transaction.js";
import { User } from "./User.js";
import { Account } from "./Account.js";
import { Envelope } from "./Envelope.js";
import { Allocation } from "./Allocation.js";
import { Transfer } from "./Transfer.js";
import { EnvelopeGroup } from "./EnvelopeGroup.js";
import { Payee } from "./Payee.js";

@Entity()
export class Budget {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @OneToMany(() => Envelope, (x) => x.budget)
  envelopes!: Relation<Envelope>[];

  @OneToMany(() => EnvelopeGroup, (x) => x.budget)
  envelopeGroups!: Relation<EnvelopeGroup>[];

  @OneToMany(() => Transaction, (x) => x.budget)
  transactions!: Relation<Transaction>[];

  @OneToMany(() => Allocation, (x) => x.budget)
  allocations!: Relation<Allocation>[];

  @OneToMany(() => Transfer, (x) => x.budget)
  transfers!: Relation<Transfer>[];

  @OneToMany(() => Account, (x) => x.budget)
  accounts!: Relation<Account>[];

  @OneToMany(() => Payee, (x) => x.budget)
  payees!: Relation<Payee>[];

  @ManyToOne(() => User, (x) => x.budgets)
  user!: Relation<User>;

  @Column({ type: "varchar" })
  userId!: string;
}
