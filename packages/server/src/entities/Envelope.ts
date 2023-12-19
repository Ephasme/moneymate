import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Allocation } from "./Allocation.js";
import { User } from "./User.js";
import { Budget } from "./Budget.js";
import { Transfer } from "./Transfer.js";
import { EnvelopeGroup } from "./EnvelopeGroup.js";

@Entity()
export class Envelope {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @OneToMany(() => Allocation, (x) => x.envelope)
  allocations!: Relation<Allocation>[];

  @OneToMany(() => Transfer, (x) => x.fromEnvelope)
  fromTransfers!: Relation<Transfer>[];

  @OneToMany(() => Transfer, (x) => x.toEnvelope)
  toTransfers!: Relation<Transfer>[];

  @ManyToOne(() => EnvelopeGroup, (x) => x.envelopes)
  parent!: Relation<EnvelopeGroup>;

  @Column({ type: "varchar" })
  parentId!: string;

  @ManyToOne(() => User, (x) => x.envelopes)
  user!: Relation<User>;

  @Column({ type: "varchar" })
  userId!: string;

  @ManyToOne(() => Budget, (x) => x.envelopes)
  budget!: Relation<Budget>;

  @Column({ type: "varchar" })
  budgetId!: string;

  @Column({ type: "bool", default: false })
  isHidden!: boolean;

  @Column({ type: "bool", default: false })
  isDefault!: boolean;
}
