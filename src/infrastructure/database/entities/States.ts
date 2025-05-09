import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Countries } from "./Countries";

@Index("index_states_country_id", ["countryId"], {})
@Index("states_pkey", ["id"], { unique: true })
@Entity("states", { schema: "public" })
export class States {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "country_id" })
  countryId: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @ManyToOne(() => Countries, (countries) => countries.states, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "country_id", referencedColumnName: "id" }])
  country: Countries;
}
