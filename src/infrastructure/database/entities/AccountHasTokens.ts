import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Accounts } from "./Accounts";
import { Tokens } from "./Tokens";

@Index("index_account_id_token_id", ["accountId", "tokenId"], {})
@Index("index_account_id", ["accountId"], {})
@Index("account_has_token_pkey", ["id"], { unique: true })
@Index("index_token_id", ["tokenId"], {})
@Entity("account_has_tokens", { schema: "public" })
export class AccountHasTokens {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @PrimaryGeneratedColumn({ type: "bigint", name: "token_id" })
  tokenId: string;

  @Column("uuid", { name: "account_id" })
  accountId: string;

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

  @ManyToOne(() => Accounts, (accounts) => accounts.accountHasTokens, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Accounts;

  @ManyToOne(() => Tokens, (tokens) => tokens.accountHasTokens, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "token_id", referencedColumnName: "id" }])
  token: Tokens;
}
