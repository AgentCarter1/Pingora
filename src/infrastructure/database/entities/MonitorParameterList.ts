import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MonitorTypes } from "./MonitorTypes";

@Index("monitor_parameter_list_pkey", ["id"], { unique: true })
@Index("index_monitor_parameter_list_monitor_type_id", ["monitorTypeId"], {})
@Entity("monitor_parameter_list", { schema: "public" })
export class MonitorParameterList {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("integer", { name: "monitor_type_id", nullable: true })
  monitorTypeId: number | null;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("boolean", {
    name: "is_modify",
    nullable: true,
    default: () => "true",
  })
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

  @ManyToOne(
    () => MonitorTypes,
    (monitorTypes) => monitorTypes.monitorParameterLists
  )
  @JoinColumn([{ name: "monitor_type_id", referencedColumnName: "id" }])
  monitorType: MonitorTypes;
}
