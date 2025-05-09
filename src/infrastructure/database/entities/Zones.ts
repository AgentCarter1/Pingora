import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccountHasOwnerZones } from "./AccountHasOwnerZones";
import { AccountHasZones } from "./AccountHasZones";
import { AccountInvites } from "./AccountInvites";
import { Monitors } from "./Monitors";
import { Permissions } from "./Permissions";
import { Roles } from "./Roles";
import { ZoneHasAddresses } from "./ZoneHasAddresses";
import { ZoneHasEmails } from "./ZoneHasEmails";
import { ZoneHasLicenses } from "./ZoneHasLicenses";
import { ZoneHasPhones } from "./ZoneHasPhones";
import { ZoneHasTokens } from "./ZoneHasTokens";
import { ZoneParameters } from "./ZoneParameters";
import { ZoneTypes } from "./ZoneTypes";

@Index("zones_pkey", ["id"], { unique: true })
@Index("index_zones_parent_id", ["parentId"], {})
@Index("index_zones_zone_type_id", ["zoneTypeId"], {})
@Entity("zones", { schema: "public" })
export class Zones {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "parent_id", nullable: true })
  parentId: string | null;

  @PrimaryGeneratedColumn({ type: "bigint", name: "zone_type_id" })
  zoneTypeId: string;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "description", nullable: true })
  description: string | null;

  @Column("boolean", {
    name: "is_active",
    nullable: true,
    default: () => "true",
  })
  isActive: boolean | null;

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
    () => AccountHasOwnerZones,
    (accountHasOwnerZones) => accountHasOwnerZones.zone
  )
  accountHasOwnerZones: AccountHasOwnerZones[];

  @OneToMany(() => AccountHasZones, (accountHasZones) => accountHasZones.zone)
  accountHasZones: AccountHasZones[];

  @OneToMany(() => AccountInvites, (accountInvites) => accountInvites.zone)
  accountInvites: AccountInvites[];

  @OneToMany(() => Monitors, (monitors) => monitors.zone)
  monitors: Monitors[];

  @OneToMany(() => Permissions, (permissions) => permissions.workspace)
  permissions: Permissions[];

  @OneToMany(() => Roles, (roles) => roles.zone)
  roles: Roles[];

  @OneToOne(
    () => ZoneHasAddresses,
    (zoneHasAddresses) => zoneHasAddresses.zones
  )
  zoneHasAddresses: ZoneHasAddresses;

  @OneToOne(() => ZoneHasEmails, (zoneHasEmails) => zoneHasEmails.zones)
  zoneHasEmails: ZoneHasEmails;

  @OneToMany(() => ZoneHasLicenses, (zoneHasLicenses) => zoneHasLicenses.zone)
  zoneHasLicenses: ZoneHasLicenses[];

  @OneToMany(() => ZoneHasPhones, (zoneHasPhones) => zoneHasPhones.zones)
  zoneHasPhones: ZoneHasPhones[];

  @OneToMany(() => ZoneHasTokens, (zoneHasTokens) => zoneHasTokens.zones)
  zoneHasTokens: ZoneHasTokens[];

  @OneToMany(() => ZoneParameters, (zoneParameters) => zoneParameters.zone)
  zoneParameters: ZoneParameters[];

  @ManyToOne(() => Zones, (zones) => zones.zones, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: Zones;

  @OneToMany(() => Zones, (zones) => zones.parent)
  zones: Zones[];

  @ManyToOne(() => ZoneTypes, (zoneTypes) => zoneTypes.zones)
  @JoinColumn([{ name: "zone_type_id", referencedColumnName: "id" }])
  zoneType: ZoneTypes;
}
