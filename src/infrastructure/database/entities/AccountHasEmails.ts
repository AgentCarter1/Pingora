import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Accounts } from "./Accounts";
import { Emails } from "./Emails";

@Index("account_has_emails_pkeys", ["accountId", "emailId"], { unique: true })
@Index("index_account_id_email_id", ["accountId", "emailId"], { unique: true })
@Entity("account_has_emails", { schema: "public" })
export class AccountHasEmails {
  @PrimaryGeneratedColumn({ type: "bigint", name: "email_id" })
  emailId: string;

  @Column("uuid", { primary: true, name: "account_id" })
  accountId: string;

  @Column("character varying", {
    name: "is_default",
    nullable: true,
    length: 255,
  })
  isDefault: string | null;

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

  @OneToOne(() => Accounts, (accounts) => accounts.accountHasEmails, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "account_id", referencedColumnName: "id" },
    { name: "account_id", referencedColumnName: "id" },
  ])
  accounts: Accounts;

  @ManyToOne(() => Emails, (emails) => emails.accountHasEmails, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "email_id", referencedColumnName: "id" }])
  email: Emails;
}
