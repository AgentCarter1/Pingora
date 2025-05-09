import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Licenses } from "./Licenses";

@Index("license_parameters_pkey", ["id"], { unique: true })
@Index("license_parameters_unique_constraint", ["licenseId", "name"], {
  unique: true,
})
@Entity("license_parameters", { schema: "public" })
export class LicenseParameters {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("uuid", { name: "license_id", unique: true })
  licenseId: string;

  @Column("character varying", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("boolean", {
    name: "is_active",
    nullable: true,
    default: () => "true",
  })
  isActive: boolean | null;

  @Column("jsonb", { name: "data" })
  data: object;

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

  @ManyToOne(() => Licenses, (licenses) => licenses.licenseParameters, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "license_id", referencedColumnName: "id" }])
  license: Licenses;
}
