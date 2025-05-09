import { Column, Entity, Index } from "typeorm";

@Index("default_role_list_pkey", ["id"], { unique: true })
@Entity("default_role_list", { schema: "public" })
export class DefaultRoleList {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("bigint", { name: "level" })
  level: string;

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
}
