import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Accounts } from "./Accounts";
import { MonitorNotification } from "./MonitorNotification";

@Index(
  "index_account_id_monitor_notification_id",
  ["accountId", "monitorNotificationId"],
  { unique: true }
)
@Index(
  "monitor_notification_has_accounts_pkey",
  ["accountId", "monitorNotificationId"],
  { unique: true }
)
@Entity("monitor_notification_has_accounts", { schema: "public" })
export class MonitorNotificationHasAccounts {
  @Column("uuid", { primary: true, name: "monitor_notification_id" })
  monitorNotificationId: string;

  @Column("uuid", { primary: true, name: "account_id" })
  accountId: string;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

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

  @ManyToOne(
    () => Accounts,
    (accounts) => accounts.monitorNotificationHasAccounts
  )
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Accounts;

  @ManyToOne(
    () => MonitorNotification,
    (monitorNotification) => monitorNotification.monitorNotificationHasAccounts
  )
  @JoinColumn([{ name: "monitor_notification_id", referencedColumnName: "id" }])
  monitorNotification: MonitorNotification;
}
