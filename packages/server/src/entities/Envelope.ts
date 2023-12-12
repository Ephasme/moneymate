import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Allocation } from "./Allocation";
import { User } from "./User";
import { Budget } from "./Budget";
import { Transfer } from "./Transfer";
import { EnvelopeGroup } from "./EnvelopeGroup";

@Entity()
export class Envelope {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => Allocation, (x) => x.envelope)
  allocations!: Allocation[];

  @OneToMany(() => Transfer, (x) => x.fromEnvelope)
  fromTransfers!: Transfer[];

  @OneToMany(() => Transfer, (x) => x.toEnvelope)
  toTransfers!: Transfer[];

  @ManyToOne(() => EnvelopeGroup, (x) => x.envelopes)
  parent!: EnvelopeGroup;

  @Column()
  parentId!: string;

  @ManyToOne(() => User, (x) => x.envelopes)
  user!: User;

  @Column()
  userId!: string;

  @ManyToOne(() => Budget, (x) => x.envelopes)
  budget!: Budget;

  @Column()
  budgetId!: string;

  @Column({ default: false })
  isHidden!: boolean;

  @Column({ default: false })
  isDefault!: boolean;
}
