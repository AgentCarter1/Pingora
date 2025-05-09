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

@Index("account_has_owner_zones_pkey", ["id"], { unique: true })
@Entity("account_has_owner_zones", { schema: "public" })
export class AccountHasOwnerZones {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

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

  @ManyToOne(() => Accounts, (accounts) => accounts.accountHasOwnerZones, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Accounts;

  @ManyToOne(() => Zones, (zones) => zones.accountHasOwnerZones, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "zone_id", referencedColumnName: "id" }])
  zone: Zones;
}
