import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccountHasPermissions } from "./AccountHasPermissions";
import { PermissionHasAccesses } from "./PermissionHasAccesses";
import { PermissionHasModels } from "./PermissionHasModels";
import { ModelTypes } from "./ModelTypes";
import { Zones } from "./Zones";
import { RoleHasPermissions } from "./RoleHasPermissions";

@Index("permissions_pkey", ["id"], { unique: true })
@Index("index_permissions_model_type_id", ["modelTypeId"], {})
@Index("index_permissions_workspace_id", ["workspaceId"], {})
@Entity("permissions", { schema: "public" })
export class Permissions {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("uuid", { name: "workspace_id" })
  workspaceId: string;

  @Column("bigint", { name: "model_type_id" })
  modelTypeId: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("boolean", { name: "effect", default: () => "true" })
  effect: boolean;

  @Column("boolean", { name: "is_action_all", nullable: true })
  isActionAll: boolean | null;

  @Column("boolean", { name: "is_action_create", nullable: true })
  isActionCreate: boolean | null;

  @Column("boolean", { name: "is_action_query", nullable: true })
  isActionQuery: boolean | null;

  @Column("boolean", { name: "is_action_update", nullable: true })
  isActionUpdate: boolean | null;

  @Column("boolean", { name: "is_action_delete", nullable: true })
  isActionDelete: boolean | null;

  @Column("boolean", { name: "is_action_access", nullable: true })
  isActionAccess: boolean | null;

  @Column("boolean", { name: "is_time_all", nullable: true })
  isTimeAll: boolean | null;

  @Column("boolean", { name: "is_model_all", nullable: true })
  isModelAll: boolean | null;

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

  @OneToMany(
    () => AccountHasPermissions,
    (accountHasPermissions) => accountHasPermissions.permission
  )
  accountHasPermissions: AccountHasPermissions[];

  @OneToMany(
    () => PermissionHasAccesses,
    (permissionHasAccesses) => permissionHasAccesses.permission
  )
  permissionHasAccesses: PermissionHasAccesses[];

  @OneToMany(
    () => PermissionHasModels,
    (permissionHasModels) => permissionHasModels.permission
  )
  permissionHasModels: PermissionHasModels[];

  @ManyToOne(() => ModelTypes, (modelTypes) => modelTypes.permissions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "model_type_id", referencedColumnName: "id" }])
  modelType: ModelTypes;

  @ManyToOne(() => Zones, (zones) => zones.permissions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "workspace_id", referencedColumnName: "id" }])
  workspace: Zones;

  @OneToMany(
    () => RoleHasPermissions,
    (roleHasPermissions) => roleHasPermissions.permission
  )
  roleHasPermissions: RoleHasPermissions[];
}
