import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Permissions } from "./Permissions";

@Index("index_permission_has_models", ["modelId", "permissionId"], {
  unique: true,
})
@Index("permission_has_models_pkey", ["modelId", "permissionId"], {
  unique: true,
})
@Entity("permission_has_models", { schema: "public" })
export class PermissionHasModels {
  @Column("uuid", { primary: true, name: "model_id" })
  modelId: string;

  @Column("integer", { primary: true, name: "permission_id" })
  permissionId: number;

  @ManyToOne(
    () => Permissions,
    (permissions) => permissions.permissionHasModels,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "permission_id", referencedColumnName: "id" }])
  permission: Permissions;
}
