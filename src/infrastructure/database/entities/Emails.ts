import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccountHasEmails } from "./AccountHasEmails";
import { ZoneHasEmails } from "./ZoneHasEmails";

@Index("index_emails_data", ["data"], {})
@Index("emails_pkey", ["id"], { unique: true })
@Entity("emails", { schema: "public" })
export class Emails {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "data", nullable: true, length: 255 })
  data: string | null;

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

  @OneToMany(
    () => AccountHasEmails,
    (accountHasEmails) => accountHasEmails.email
  )
  accountHasEmails: AccountHasEmails[];

  @OneToMany(() => ZoneHasEmails, (zoneHasEmails) => zoneHasEmails.email)
  zoneHasEmails: ZoneHasEmails[];
}
