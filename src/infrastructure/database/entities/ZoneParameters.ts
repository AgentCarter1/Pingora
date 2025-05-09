import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Zones } from "./Zones";

@Index("zone_parameters_pkey", ["id"], { unique: true })
@Index("index_zone_parameters_name_zone_id", ["name", "zoneId"], {
  unique: true,
})
@Entity("zone_parameters", { schema: "public" })
export class ZoneParameters {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("uuid", { name: "zone_id" })
  zoneId: string;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("jsonb", { name: "data" })
  data: object;

  @Column("boolean", { name: "is_modify", nullable: true })
  isModify: boolean | null;

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

  @ManyToOne(() => Zones, (zones) => zones.zoneParameters, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "zone_id", referencedColumnName: "id" }])
  zone: Zones;
}
