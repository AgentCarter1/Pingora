import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ZoneParameterList } from "./ZoneParameterList";
import { Zones } from "./Zones";

@Index("zone_types_pkey", ["id"], { unique: true })
@Entity("zone_types", { schema: "public" })
export class ZoneTypes {
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
    () => ZoneParameterList,
    (zoneParameterList) => zoneParameterList.zoneType
  )
  zoneParameterLists: ZoneParameterList[];

  @OneToMany(() => Zones, (zones) => zones.zoneType)
  zones: Zones[];
}
