import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MonitorParameters } from "./MonitorParameters";
import { MonitorTypes } from "./MonitorTypes";
import { Zones } from "./Zones";

@Index("monitors_pkey", ["id"], { unique: true })
@Index("index_monitors_monitor_type_id", ["monitorTpyeId"], {})
@Index("index_monitors_zone_id", ["zoneId"], {})
@Entity("monitors", { schema: "public" })
export class Monitors {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "zone_id", nullable: true })
  zoneId: string | null;

  @PrimaryGeneratedColumn({ type: "bigint", name: "monitor_tpye_id" })
  monitorTpyeId: string;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "description", nullable: true })
  description: string | null;

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

  @OneToMany(
    () => MonitorParameters,
    (monitorParameters) => monitorParameters.monitor
  )
  monitorParameters: MonitorParameters[];

  @ManyToOne(() => MonitorTypes, (monitorTypes) => monitorTypes.monitors)
  @JoinColumn([{ name: "monitor_tpye_id", referencedColumnName: "id" }])
  monitorTpye: MonitorTypes;

  @ManyToOne(() => Zones, (zones) => zones.monitors)
  @JoinColumn([{ name: "zone_id", referencedColumnName: "id" }])
  zone: Zones;
}
