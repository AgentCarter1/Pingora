import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Emails } from "./Emails";
import { Zones } from "./Zones";

@Index("zone_has_emails_pkey", ["emailId", "zoneId"], { unique: true })
@Index("index_zone_id_email_id", ["emailId", "zoneId"], { unique: true })
@Entity("zone_has_emails", { schema: "public" })
export class ZoneHasEmails {
  @PrimaryGeneratedColumn({ type: "bigint", name: "email_id" })
  emailId: string;

  @Column("uuid", { primary: true, name: "zone_id" })
  zoneId: string;

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

  @ManyToOne(() => Emails, (emails) => emails.zoneHasEmails, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "email_id", referencedColumnName: "id" }])
  email: Emails;

  @OneToOne(() => Zones, (zones) => zones.zoneHasEmails, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "zone_id", referencedColumnName: "id" },
    { name: "zone_id", referencedColumnName: "id" },
  ])
  zones: Zones;
}
