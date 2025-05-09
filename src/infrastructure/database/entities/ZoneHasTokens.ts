import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tokens } from "./Tokens";
import { Zones } from "./Zones";

@Index("zone_has_token_pkey", ["id"], { unique: true })
@Index("index_token_id_zone_id", ["tokenId", "zoneId"], {})
@Entity("zone_has_tokens", { schema: "public" })
export class ZoneHasTokens {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @PrimaryGeneratedColumn({ type: "bigint", name: "token_id" })
  tokenId: string;

  @Column("uuid", { name: "zone_id" })
  zoneId: string;

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

  @ManyToOne(() => Tokens, (tokens) => tokens.zoneHasTokens, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "token_id", referencedColumnName: "id" }])
  token: Tokens;

  @ManyToOne(() => Zones, (zones) => zones.zoneHasTokens, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "zone_id", referencedColumnName: "id" },
    { name: "zone_id", referencedColumnName: "id" },
  ])
  zones: Zones;
}
