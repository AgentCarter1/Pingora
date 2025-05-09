import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccountHasAddresses } from "./AccountHasAddresses";
import { ZoneHasAddresses } from "./ZoneHasAddresses";

@Index("addresses_pkey", ["id"], { unique: true })
@Entity("addresses", { schema: "public" })
export class Addresses {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "line_1", nullable: true, length: 255 })
  line_1: string | null;

  @Column("character varying", { name: "line_2", nullable: true, length: 255 })
  line_2: string | null;

  @Column("character varying", {
    name: "district",
    nullable: true,
    length: 255,
  })
  district: string | null;

  @Column("character varying", { name: "city", nullable: true, length: 255 })
  city: string | null;

  @Column("character varying", { name: "country", nullable: true, length: 255 })
  country: string | null;

  @Column("character varying", {
    name: "countryCode",
    nullable: true,
    length: 255,
  })
  countryCode: string | null;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("boolean", { name: "is_invoice", nullable: true })
  isInvoice: boolean | null;

  @Column("boolean", { name: "is_default", nullable: true })
  isDefault: boolean | null;

  @Column("character varying", {
    name: "identification_number",
    nullable: true,
    length: 255,
  })
  identificationNumber: string | null;

  @Column("character varying", { name: "tax_id", nullable: true, length: 255 })
  taxId: string | null;

  @Column("character varying", {
    name: "tax_office",
    nullable: true,
    length: 255,
  })
  taxOffice: string | null;

  @Column("jsonb", { name: "phone", nullable: true })
  phone: object | null;

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
    () => AccountHasAddresses,
    (accountHasAddresses) => accountHasAddresses.address
  )
  accountHasAddresses: AccountHasAddresses[];

  @OneToOne(
    () => ZoneHasAddresses,
    (zoneHasAddresses) => zoneHasAddresses.addresses
  )
  zoneHasAddresses: ZoneHasAddresses;
}
