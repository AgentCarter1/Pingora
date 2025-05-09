import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Licenses } from "./Licenses";
import { Zones } from "./Zones";

@Index("zone_has_licenses_pkey", ["licenseId", "zoneId"], { unique: true })
@Index("index_zone_has_licenses_zone_id_license_id", ["licenseId", "zoneId"], {
  unique: true,
})
@Entity("zone_has_licenses", { schema: "public" })
export class ZoneHasLicenses {
  @Column("uuid", { primary: true, name: "zone_id" })
  zoneId: string;

  @Column("uuid", { primary: true, name: "license_id" })
  licenseId: string;

  @Column("boolean", {
    name: "is_active",
    nullable: true,
    default: () => "true",
  })
  isActive: boolean | null;

  @Column("timestamp without time zone", { name: "begin_at", nullable: true })
  beginAt: Date | null;

  @Column("timestamp without time zone", { name: "expire_at", nullable: true })
  expireAt: Date | null;

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

  @ManyToOne(() => Licenses, (licenses) => licenses.zoneHasLicenses, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "license_id", referencedColumnName: "id" }])
  license: Licenses;

  @ManyToOne(() => Zones, (zones) => zones.zoneHasLicenses, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "zone_id", referencedColumnName: "id" }])
  zone: Zones;
}
