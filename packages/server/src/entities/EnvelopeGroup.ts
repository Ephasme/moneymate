import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Envelope } from "./Envelope";
import { User } from "./User";
import { Budget } from "./Budget";

@Entity()
export class EnvelopeGroup {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => User, (x) => x.envelopeGroups)
  user!: User;

  @ManyToOne(() => Budget, (x) => x.envelopeGroups)
  budget!: Budget;

  @Column()
  budgetId!: string;

  @Column()
  userId!: string;

  @OneToMany(() => Envelope, (group) => group.parent)
  envelopes!: Envelope[];
}
