import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PermissionHasAccesses } from "./PermissionHasAccesses";

@Index("accesses_pkey", ["id"], { unique: true })
@Entity("accesses", { schema: "public" })
export class Accesses {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("time without time zone", { name: "start_time", nullable: true })
  startTime: string | null;

  @Column("time without time zone", { name: "end_time", nullable: true })
  endTime: string | null;

  @Column("timestamp without time zone", { name: "start_at", nullable: true })
  startAt: Date | null;

  @Column("timestamp without time zone", { name: "end_at", nullable: true })
  endAt: Date | null;

  @Column("smallint", { name: "day", nullable: true })
  day: number | null;

  @Column("character varying", { name: "ip", nullable: true, length: 50 })
  ip: string | null;

  @Column("jsonb", { name: "device", nullable: true })
  device: object | null;

  @Column("boolean", { name: "is_repeat", default: () => "false" })
  isRepeat: boolean;

  @Column("smallint", { name: "timezone", nullable: true })
  timezone: number | null;

  @Column("jsonb", { name: "access_options", nullable: true })
  accessOptions: object | null;

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

  @OneToMany(
    () => PermissionHasAccesses,
    (permissionHasAccesses) => permissionHasAccesses.access
  )
  permissionHasAccesses: PermissionHasAccesses[];
}
