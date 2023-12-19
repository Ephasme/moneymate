import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Account } from "./Account.js";
import { Envelope } from "./Envelope.js";
import { Budget } from "./Budget.js";
import { Transaction } from "./Transaction.js";
import { Allocation } from "./Allocation.js";
import { Payee } from "./Payee.js";
import { Transfer } from "./Transfer.js";
import { EnvelopeGroup } from "./EnvelopeGroup.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "varchar" })
  salt!: string;

  @OneToMany(() => Account, (x) => x.user)
  accounts!: Relation<Account>[];

  @OneToMany(() => Envelope, (x) => x.user)
  envelopes!: Relation<Envelope>[];

  @OneToMany(() => EnvelopeGroup, (x) => x.user)
  envelopeGroups!: Relation<EnvelopeGroup>[];

  @OneToMany(() => Budget, (x) => x.user)
  budgets!: Relation<Budget>[];

  @OneToMany(() => Transaction, (x) => x.user)
  transactions!: Relation<Transaction>[];

  @OneToMany(() => Allocation, (x) => x.user)
  allocations!: Relation<Allocation>[];

  @OneToMany(() => Transfer, (x) => x.budget)
  transfers!: Relation<Transfer>[];

  @OneToMany(() => Payee, (x) => x.user)
  payees!: Relation<Payee>[];
}
