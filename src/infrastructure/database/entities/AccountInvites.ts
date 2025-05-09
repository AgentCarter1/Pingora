import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Accounts } from "./Accounts";
import { Zones } from "./Zones";

@Index(
  "index_account_invites_email_account_id_zone_id",
  ["accountId", "email", "zoneId"],
  { unique: true }
)
@Index("index_account_invites_expire", ["expireAt"], {})
@Index("account_invites_pkey", ["id"], { unique: true })
@Entity("account_invites", { schema: "public" })
export class AccountInvites {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "email", length: 255 })
  email: string;

  @Column("uuid", { name: "account_id" })
  accountId: string;

  @Column("uuid", { name: "zone_id" })
  zoneId: string;

  @Column("character varying", { name: "token" })
  token: string;

  @Column("character varying", { name: "status", length: 255 })
  status: string;

  @Column("jsonb", { name: "roles", nullable: true })
  roles: object | null;

  @Column("jsonb", { name: "permissions", nullable: true })
  permissions: object | null;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "expire_at" })
  expireAt: Date;

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Accounts, (accounts) => accounts.accountInvites, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Accounts;

  @ManyToOne(() => Zones, (zones) => zones.accountInvites, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "zone_id", referencedColumnName: "id" }])
  zone: Zones;
}
