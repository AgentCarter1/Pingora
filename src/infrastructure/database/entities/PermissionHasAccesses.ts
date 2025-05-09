import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Accesses } from "./Accesses";
import { Permissions } from "./Permissions";

@Index("index_permission_has_accesses_access_id", ["accessId"], {})
@Index("permission_has_accesses_pkey", ["id"], { unique: true })
@Index("index_permission_has_accesses_permission_id", ["permissionId"], {})
@Entity("permission_has_accesses", { schema: "public" })
export class PermissionHasAccesses {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "permission_id" })
  permissionId: string;

  @Column("bigint", { name: "access_id" })
  accessId: string;

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

  @ManyToOne(() => Accesses, (accesses) => accesses.permissionHasAccesses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "access_id", referencedColumnName: "id" }])
  access: Accesses;

  @ManyToOne(
    () => Permissions,
    (permissions) => permissions.permissionHasAccesses,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "permission_id", referencedColumnName: "id" }])
  permission: Permissions;
}
