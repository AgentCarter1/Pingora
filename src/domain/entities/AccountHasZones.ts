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

@Index("index_account_has_zones_account_id_zone_id", ["accountId", "zoneId"], {
  unique: true,
})
@Index("account_has_zones_pkey", ["id"], { unique: true })
@Entity("account_has_zones", { schema: "public" })
export class AccountHasZones {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("uuid", { name: "account_id" })
  accountId: string;

  @Column("uuid", { name: "zone_id" })
  zoneId: string;

  @Column("boolean", {
    name: "is_active",
    nullable: true,
    default: () => "true",
  })
  isActive: boolean | null;

  @Column("timestamp without time zone", { name: "start_at", nullable: true })
  startAt: Date | null;

  @Column("timestamp without time zone", { name: "end_at", nullable: true })
  endAt: Date | null;

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

  @ManyToOne(() => Accounts, (accounts) => accounts.accountHasZones, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Accounts;

  @ManyToOne(() => Zones, (zones) => zones.accountHasZones, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "zone_id", referencedColumnName: "id" }])
  zone: Zones;
}
