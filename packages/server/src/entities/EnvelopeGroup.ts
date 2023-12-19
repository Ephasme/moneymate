import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Envelope } from "./Envelope.js";
import { User } from "./User.js";
import { Budget } from "./Budget.js";

@Entity()
export class EnvelopeGroup {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @ManyToOne(() => User, (x) => x.envelopeGroups)
  user!: Relation<User>;

  @ManyToOne(() => Budget, (x) => x.envelopeGroups)
  budget!: Relation<Budget>;

  @Column({ type: "varchar" })
  budgetId!: string;

  @Column({ type: "varchar" })
  userId!: string;

  @OneToMany(() => Envelope, (group) => group.parent)
  envelopes!: Relation<Envelope>[];

  @Column({ type: "bool", default: false })
  isSystem!: boolean;

  @Column({ type: "bool", default: false })
  isHidden!: boolean;

  @Column({ type: "bool", default: false })
  isDefault!: boolean;
}
