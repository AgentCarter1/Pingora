import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Accounts } from "./Accounts";
import { Permissions } from "./Permissions";

@Index("index_permission_has_accesses", ["accountId", "permissionId"], {
  unique: true,
})
@Index("account_has_permissions_pkey", ["accountId", "permissionId"], {
  unique: true,
})
@Entity("account_has_permissions", { schema: "public" })
export class AccountHasPermissions {
  @Column("bigint", { primary: true, name: "permission_id" })
  permissionId: string;

  @Column("uuid", { primary: true, name: "account_id" })
  accountId: string;

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

  @ManyToOne(() => Accounts, (accounts) => accounts.accountHasPermissions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Accounts;

  @ManyToOne(
    () => Permissions,
    (permissions) => permissions.accountHasPermissions,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "permission_id", referencedColumnName: "id" }])
  permission: Permissions;
}
