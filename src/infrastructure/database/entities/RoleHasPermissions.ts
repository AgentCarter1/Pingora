import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Permissions } from "./Permissions";
import { Roles } from "./Roles";

@Index("index_role_has_permissions_permission_id", ["permissionId"], {})
@Index("role_has_permissions_pkey", ["permissionId", "roleId"], {
  unique: true,
})
@Index("role_has_permissions_role_id_foreign", ["roleId"], {})
@Entity("role_has_permissions", { schema: "public" })
export class RoleHasPermissions {
  @Column("bigint", { primary: true, name: "permission_id" })
  permissionId: string;

  @Column("uuid", { primary: true, name: "role_id" })
  roleId: string;

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

  @ManyToOne(
    () => Permissions,
    (permissions) => permissions.roleHasPermissions,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "permission_id", referencedColumnName: "id" }])
  permission: Permissions;

  @ManyToOne(() => Roles, (roles) => roles.roleHasPermissions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Roles;
}
