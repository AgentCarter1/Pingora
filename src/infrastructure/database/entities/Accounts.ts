import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import { AccountHasAddresses } from "./AccountHasAddresses";
import { AccountHasEmails } from "./AccountHasEmails";
import { AccountHasOwnerZones } from "./AccountHasOwnerZones";
import { AccountHasPermissions } from "./AccountHasPermissions";
import { AccountHasPhones } from "./AccountHasPhones";
import { AccountHasRoles } from "./AccountHasRoles";
import { AccountHasTokens } from "./AccountHasTokens";
import { AccountHasZones } from "./AccountHasZones";
import { AccountInvites } from "./AccountInvites";
import { AccountParameters } from "./AccountParameters";
import { MonitorNotificationHasAccounts } from "./MonitorNotificationHasAccounts";

@Index("accounts_pkey", ["id"], { unique: true })
@Entity("accounts", { schema: "public" })
export class Accounts {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("jsonb", { name: "phone", nullable: true })
  phone: object | null;

  @Column("character varying", { name: "password", nullable: true })
  password: string | null;

  @Column("timestamp without time zone", {
    name: "verified_at",
    nullable: true,
  })
  verifiedAt: Date | null;

  @Column("boolean", {
    name: "is_active",
    nullable: true,
    default: () => "true",
  })
  isActive: boolean | null;

  @Column("text", { name: "two_factor_secret", nullable: true })
  twoFactorSecret: string | null;

  @Column("text", { name: "two_factor_recovery_codes", nullable: true })
  twoFactorRecoveryCodes: string | null;

  @Column("timestamp without time zone", {
    name: "two_factor_confirmed_at",
    nullable: true,
  })
  twoFactorConfirmedAt: Date | null;

  @Column("timestamp without time zone", {
    name: "last_activity_at",
    nullable: true,
  })
  lastActivityAt: Date | null;

  @Column("timestamp without time zone", {
    name: "last_login_at",
    nullable: true,
  })
  lastLoginAt: Date | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => AccountHasAddresses,
    (accountHasAddresses) => accountHasAddresses.account
  )
  accountHasAddresses: AccountHasAddresses[];

  @OneToOne(
    () => AccountHasEmails,
    (accountHasEmails) => accountHasEmails.accounts
  )
  accountHasEmails: AccountHasEmails;

  @OneToMany(
    () => AccountHasOwnerZones,
    (accountHasOwnerZones) => accountHasOwnerZones.account
  )
  accountHasOwnerZones: AccountHasOwnerZones[];

  @OneToMany(
    () => AccountHasPermissions,
    (accountHasPermissions) => accountHasPermissions.account
  )
  accountHasPermissions: AccountHasPermissions[];

  @OneToMany(
    () => AccountHasPhones,
    (accountHasPhones) => accountHasPhones.accounts
  )
  accountHasPhones: AccountHasPhones[];

  @OneToMany(
    () => AccountHasRoles,
    (accountHasRoles) => accountHasRoles.account
  )
  accountHasRoles: AccountHasRoles[];

  @OneToMany(
    () => AccountHasTokens,
    (accountHasTokens) => accountHasTokens.account
  )
  accountHasTokens: AccountHasTokens[];

  @OneToMany(
    () => AccountHasZones,
    (accountHasZones) => accountHasZones.account
  )
  accountHasZones: AccountHasZones[];

  @OneToMany(() => AccountInvites, (accountInvites) => accountInvites.account)
  accountInvites: AccountInvites[];

  @OneToMany(
    () => AccountParameters,
    (accountParameters) => accountParameters.account
  )
  accountParameters: AccountParameters[];

  @OneToMany(
    () => MonitorNotificationHasAccounts,
    (monitorNotificationHasAccounts) => monitorNotificationHasAccounts.account
  )
  monitorNotificationHasAccounts: MonitorNotificationHasAccounts[];
}
