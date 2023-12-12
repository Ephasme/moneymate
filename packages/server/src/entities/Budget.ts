import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Transaction } from "./Transaction";
import { User } from "./User";
import { Account } from "./Account";
import { Envelope } from "./Envelope";
import { Allocation } from "./Allocation";
import { Transfer } from "./Transfer";
import { EnvelopeGroup } from "./EnvelopeGroup";

@Entity()
export class Budget {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => Envelope, (x) => x.budget)
  envelopes!: Envelope[];

  @OneToMany(() => EnvelopeGroup, (x) => x.budget)
  envelopeGroups!: EnvelopeGroup[];

  @OneToMany(() => Transaction, (x) => x.budget)
  transactions!: Transaction[];

  @OneToMany(() => Allocation, (x) => x.budget)
  allocations!: Allocation[];

  @OneToMany(() => Transfer, (x) => x.budget)
  transfers!: Transfer[];

  @OneToMany(() => Account, (x) => x.budget)
  accounts!: Account[];

  @ManyToOne(() => User, (x) => x.budgets)
  user!: User;

  @Column()
  userId!: string;
}
