import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Phone } from "./Phone";
import { Zones } from "./Zones";

@Index("zone_has_phones_pkey", ["id"], { unique: true })
@Entity("zone_has_phones", { schema: "public" })
export class ZoneHasPhones {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("boolean", { name: "is_default", nullable: true })
  isDefault: boolean | null;

  @Column("boolean", { name: "is_active", nullable: true })
  isActive: boolean | null;

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

  @ManyToOne(() => Phone, (phone) => phone.zoneHasPhones)
  @JoinColumn([{ name: "phone_id", referencedColumnName: "id" }])
  phone: Phone;

  @ManyToOne(() => Zones, (zones) => zones.zoneHasPhones, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "zone_id", referencedColumnName: "id" },
    { name: "zone_id", referencedColumnName: "id" },
  ])
  zones: Zones;
}
