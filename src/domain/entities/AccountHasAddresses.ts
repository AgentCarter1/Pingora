import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Accounts } from "./Accounts";
import { Addresses } from "./Addresses";

@Index("account_has_addresses_pkey", ["accountId", "addressId"], {
  unique: true,
})
@Index(
  "index_account_has_addresses_account_address",
  ["accountId", "addressId"],
  { unique: true }
)
@Entity("account_has_addresses", { schema: "public" })
export class AccountHasAddresses {
  @Column("uuid", { primary: true, name: "account_id" })
  accountId: string;

  @Column("integer", { primary: true, name: "address_id" })
  addressId: number;

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

  @ManyToOne(() => Accounts, (accounts) => accounts.accountHasAddresses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Accounts;

  @ManyToOne(() => Addresses, (addresses) => addresses.accountHasAddresses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "address_id", referencedColumnName: "id" }])
  address: Addresses;
}
