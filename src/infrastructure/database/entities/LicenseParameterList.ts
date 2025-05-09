import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { LicenseTypes } from "./LicenseTypes";

@Index("license_parameter_list_pkey", ["id"], { unique: true })
@Index("index_license_parameter_list_license_type_id", ["licenseTypeId"], {})
@Entity("license_parameter_list", { schema: "public" })
export class LicenseParameterList {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "license_type_id" })
  licenseTypeId: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("boolean", {
    name: "is_active",
    nullable: true,
    default: () => "true",
  })
  isActive: boolean | null;

  @Column("jsonb", { name: "data", nullable: true })
  data: object | null;

  @Column("jsonb", { name: "validation", nullable: true })
  validation: object | null;

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

  @ManyToOne(
    () => LicenseTypes,
    (licenseTypes) => licenseTypes.licenseParameterLists,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "license_type_id", referencedColumnName: "id" }])
  licenseType: LicenseTypes;
}
