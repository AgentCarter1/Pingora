import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { LicenseParameters } from "./LicenseParameters";
import { LicenseTypes } from "./LicenseTypes";
import { ZoneHasLicenses } from "./ZoneHasLicenses";

@Index("index_licenses_id_license_type_id", ["id", "licenseTypeId"], {
  unique: true,
})
@Index("licenses_pkey", ["id"], { unique: true })
@Entity("licenses", { schema: "public" })
export class Licenses {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("bigint", { name: "license_type_id" })
  licenseTypeId: string;

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
    () => LicenseParameters,
    (licenseParameters) => licenseParameters.license
  )
  licenseParameters: LicenseParameters[];

  @ManyToOne(() => LicenseTypes, (licenseTypes) => licenseTypes.licenses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "license_type_id", referencedColumnName: "id" }])
  licenseType: LicenseTypes;

  @OneToMany(
    () => ZoneHasLicenses,
    (zoneHasLicenses) => zoneHasLicenses.license
  )
  zoneHasLicenses: ZoneHasLicenses[];
}
