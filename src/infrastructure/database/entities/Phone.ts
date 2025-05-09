import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccountHasPhones } from "./AccountHasPhones";
import { ZoneHasPhones } from "./ZoneHasPhones";

@Index("phone_pkey", ["id"], { unique: true })
@Entity("phone", { schema: "public" })
export class Phone {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("character varying", { name: "country", nullable: true, length: 255 })
  country: string | null;

  @Column("character varying", { name: "area", nullable: true, length: 255 })
  area: string | null;

  @Column("character varying", { name: "number", nullable: true, length: 255 })
  number: string | null;

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

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => AccountHasPhones,
    (accountHasPhones) => accountHasPhones.phone
  )
  accountHasPhones: AccountHasPhones[];

  @OneToMany(() => ZoneHasPhones, (zoneHasPhones) => zoneHasPhones.phone)
  zoneHasPhones: ZoneHasPhones[];
}
