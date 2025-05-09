import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Accounts } from "./Accounts";
import { Zones } from "./Zones";

@Index(
  "index_access_key_properties",
  ["accessKeyType", "accountId", "data", "zoneId"],
  { unique: true }
)
@Index("access_key_properties_pkey", ["id"], { unique: true })
@Entity("access_keys", { schema: "public" })
export class AccessKeys {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "account_id" })
  accountId: string;

  @Column("uuid", { name: "zone_id" })
  zoneId: string;

  @Column("character varying", { name: "access_key_type", length: 255 })
  accessKeyType: string;

  @Column("character varying", { name: "data", length: 255 })
  data: string;

  @Column("boolean", {
    name: "is_active",
    nullable: true,
    default: () => "true",
  })
  isActive: boolean | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Accounts, (accounts) => accounts.accessKeys, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "account_id", referencedColumnName: "id" },
    { name: "account_id", referencedColumnName: "id" },
  ])
  accounts: Accounts;

  @ManyToOne(() => Zones, (zones) => zones.accessKeys, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "zone_id", referencedColumnName: "id" },
    { name: "zone_id", referencedColumnName: "id" },
  ])
  zones: Zones;
}
