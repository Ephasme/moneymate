import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { User } from "./User.js";

@Entity()
export class Payee {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @ManyToOne(() => User, (x) => x.payees)
  user!: Relation<User>;

  @Column({ type: "varchar" })
  userId!: string;
}
