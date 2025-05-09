import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Accounts } from "./Accounts";
import { Phone } from "./Phone";

@Index("account_has_phones_pkey", ["id"], { unique: true })
@Entity("account_has_phones", { schema: "public" })
export class AccountHasPhones {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("boolean", { name: "is_default", nullable: true })
  isDefault: boolean | null;

  @Column("boolean", { name: "is_active", nullable: true })
  isActive: boolean | null;

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

  @ManyToOne(() => Accounts, (accounts) => accounts.accountHasPhones, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "account_id", referencedColumnName: "id" },
    { name: "account_id", referencedColumnName: "id" },
  ])
  accounts: Accounts;

  @ManyToOne(() => Phone, (phone) => phone.accountHasPhones)
  @JoinColumn([{ name: "phone_id", referencedColumnName: "id" }])
  phone: Phone;
}
