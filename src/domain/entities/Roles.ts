import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AccountHasRoles } from "./AccountHasRoles";
import { RoleHasPermissions } from "./RoleHasPermissions";
import { Zones } from "./Zones";

@Index("roles_pkey", ["id"], { unique: true })
@Index("index_zone_id", ["zoneId"], {})
@Entity("roles", { schema: "public" })
export class Roles {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "zone_id" })
  zoneId: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("bigint", { name: "level" })
  level: string;

  @Column("boolean", { name: "is_access", default: () => "false" })
  isAccess: boolean;

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

  @OneToMany(() => AccountHasRoles, (accountHasRoles) => accountHasRoles.role)
  accountHasRoles: AccountHasRoles[];

  @OneToMany(
    () => RoleHasPermissions,
    (roleHasPermissions) => roleHasPermissions.role
  )
  roleHasPermissions: RoleHasPermissions[];

  @ManyToOne(() => Zones, (zones) => zones.roles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "zone_id", referencedColumnName: "id" }])
  zone: Zones;
}
