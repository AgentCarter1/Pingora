import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Addresses } from "./Addresses";
import { Zones } from "./Zones";

@Index("index_address_id_zone_id", ["addressId", "zoneId"], { unique: true })
@Index("zone_has_addresses_pkey", ["addressId", "zoneId"], { unique: true })
@Entity("zone_has_addresses", { schema: "public" })
export class ZoneHasAddresses {
  @Column("uuid", { primary: true, name: "zone_id" })
  zoneId: string;

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

  @OneToOne(() => Addresses, (addresses) => addresses.zoneHasAddresses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "address_id", referencedColumnName: "id" },
    { name: "address_id", referencedColumnName: "id" },
  ])
  addresses: Addresses;

  @OneToOne(() => Zones, (zones) => zones.zoneHasAddresses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "zone_id", referencedColumnName: "id" },
    { name: "zone_id", referencedColumnName: "id" },
  ])
  zones: Zones;
}
