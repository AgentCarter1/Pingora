import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MonitorParameterList } from "./MonitorParameterList";
import { Monitors } from "./Monitors";

@Index("monitor_types_pkey", ["id"], { unique: true })
@Entity("monitor_types", { schema: "public" })
export class MonitorTypes {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

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

  @OneToMany(
    () => MonitorParameterList,
    (monitorParameterList) => monitorParameterList.monitorType
  )
  monitorParameterLists: MonitorParameterList[];

  @OneToMany(() => Monitors, (monitors) => monitors.monitorTpye)
  monitors: Monitors[];
}
