import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccountHasTokens } from "./AccountHasTokens";
import { ZoneHasTokens } from "./ZoneHasTokens";

@Index("index_account_access_tokens_expire_at", ["expireAt"], {})
@Index("tokens_pkey", ["id"], { unique: true })
@Index("index_account_access_token_token", ["token"], { unique: true })
@Entity("tokens", { schema: "public" })
export class Tokens {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "type", length: 255 })
  type: string;

  @Column("bigint", { name: "tokenable_id", nullable: true })
  tokenableId: string | null;

  @Column("text", { name: "token" })
  token: string;

  @Column("text", { name: "payload", nullable: true })
  payload: string | null;

  @Column("timestamp without time zone", { name: "expire_at" })
  expireAt: Date;

  @Column("timestamp without time zone", {
    name: "last_used_at",
    nullable: true,
  })
  lastUsedAt: Date | null;

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

  @OneToMany(
    () => AccountHasTokens,
    (accountHasTokens) => accountHasTokens.token
  )
  accountHasTokens: AccountHasTokens[];

  @OneToMany(() => ZoneHasTokens, (zoneHasTokens) => zoneHasTokens.token)
  zoneHasTokens: ZoneHasTokens[];
}
