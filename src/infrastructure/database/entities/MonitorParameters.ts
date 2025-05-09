import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Monitors } from "./Monitors";

@Index("monitor_parameters_pkey", ["id"], { unique: true })
@Index("index_monitor_parameters_monitor_id", ["monitorId"], {})
@Index("index_monitor_parameters_name_monitor_id", ["monitorId", "name"], {
  unique: true,
})
@Entity("monitor_parameters", { schema: "public" })
export class MonitorParameters {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("uuid", { name: "monitor_id", nullable: true })
  monitorId: string | null;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("boolean", { name: "is_modify", nullable: true })
  isModify: boolean | null;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

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

  @ManyToOne(() => Monitors, (monitors) => monitors.monitorParameters)
  @JoinColumn([{ name: "monitor_id", referencedColumnName: "id" }])
  monitor: Monitors;
}
