import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Accounts } from "./Accounts";
import { Roles } from "./Roles";

@Index("account_has_roles_pkey", ["accountId", "roleId"], { unique: true })
@Index(
  "index_account_has_roles_role_id_account_id",
  ["accountId", "roleId"],
  {}
)
@Entity("account_has_roles", { schema: "public" })
export class AccountHasRoles {
  @Column("uuid", { primary: true, name: "role_id" })
  roleId: string;

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

  @ManyToOne(() => Accounts, (accounts) => accounts.accountHasRoles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Accounts;

  @ManyToOne(() => Roles, (roles) => roles.accountHasRoles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Roles;
}
