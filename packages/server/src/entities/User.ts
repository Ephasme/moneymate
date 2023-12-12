import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";
import { Envelope } from "./Envelope";
import { Budget } from "./Budget";
import { Transaction } from "./Transaction";
import { Allocation } from "./Allocation";
import { Payee } from "./Payee";
import { Transfer } from "./Transfer";
import { EnvelopeGroup } from "./EnvelopeGroup";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  salt!: string;

  @OneToMany(() => Account, (x) => x.user)
  accounts!: Account[];

  @OneToMany(() => Envelope, (x) => x.user)
  envelopes!: Envelope[];

  @OneToMany(() => EnvelopeGroup, (x) => x.user)
  envelopeGroups!: EnvelopeGroup[];

  @OneToMany(() => Budget, (x) => x.user)
  budgets!: Budget[];

  @OneToMany(() => Transaction, (x) => x.user)
  transactions!: Transaction[];

  @OneToMany(() => Allocation, (x) => x.user)
  allocations!: Allocation[];

  @OneToMany(() => Transfer, (x) => x.budget)
  transfers!: Transfer[];

  @OneToMany(() => Payee, (x) => x.user)
  payees!: Payee[];
}
