import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { LicenseParameterList } from "./LicenseParameterList";
import { Licenses } from "./Licenses";

@Index("license_types_pkey", ["id"], { unique: true })
@Entity("license_types", { schema: "public" })
export class LicenseTypes {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

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
    () => LicenseParameterList,
    (licenseParameterList) => licenseParameterList.licenseType
  )
  licenseParameterLists: LicenseParameterList[];

  @OneToMany(() => Licenses, (licenses) => licenses.licenseType)
  licenses: Licenses[];
}
