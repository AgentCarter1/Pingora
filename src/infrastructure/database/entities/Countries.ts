import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { States } from "./States";

@Index("countries_pkey", ["id"], { unique: true })
@Entity("countries", { schema: "public" })
export class Countries {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("character varying", {
    name: "short_name",
    nullable: true,
    length: 255,
  })
  shortName: string | null;

  @Column("character varying", {
    name: "flag_img",
    nullable: true,
    length: 255,
  })
  flagImg: string | null;

  @Column("character varying", {
    name: "country_code",
    nullable: true,
    length: 255,
  })
  countryCode: string | null;

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

  @OneToMany(() => States, (states) => states.country)
  states: States[];
}
