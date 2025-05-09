import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ZoneTypes } from "./ZoneTypes";

@Index("zone_parameter_list_pkey", ["id"], { unique: true })
@Index("index_zone_type_id", ["zoneTypeId"], {})
@Entity("zone_parameter_list", { schema: "public" })
export class ZoneParameterList {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @PrimaryGeneratedColumn({ type: "bigint", name: "zone_type_id" })
  zoneTypeId: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("jsonb", { name: "data", nullable: true })
  data: object | null;

  @Column("boolean", { name: "is_modify", nullable: true })
  isModify: boolean | null;

  @Column("jsonb", { name: "validation", nullable: true })
  validation: object | null;

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

  @ManyToOne(() => ZoneTypes, (zoneTypes) => zoneTypes.zoneParameterLists)
  @JoinColumn([{ name: "zone_type_id", referencedColumnName: "id" }])
  zoneType: ZoneTypes;
}
