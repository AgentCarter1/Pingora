import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("account_parameter_list_pkey", ["id"], { unique: true })
@Entity("account_parameter_list", { schema: "public" })
export class AccountParameterList {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("jsonb", { name: "data", nullable: true })
  data: object | null;

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
}
