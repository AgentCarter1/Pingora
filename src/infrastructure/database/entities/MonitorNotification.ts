import { Column, Entity, Index, OneToMany } from "typeorm";
import { MonitorNotificationHasAccounts } from "./MonitorNotificationHasAccounts";
import { MonitorNotificationHasNotificationChannels } from "./MonitorNotificationHasNotificationChannels";
import { MonitorNotificationHasNotificationEvents } from "./MonitorNotificationHasNotificationEvents";

@Index("monitor_notification_pkey", ["id"], { unique: true })
@Entity("monitor_notification", { schema: "public" })
export class MonitorNotification {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("integer", { name: "monitor_id", nullable: true })
  monitorId: number | null;

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
    () => MonitorNotificationHasAccounts,
    (monitorNotificationHasAccounts) =>
      monitorNotificationHasAccounts.monitorNotification
  )
  monitorNotificationHasAccounts: MonitorNotificationHasAccounts[];

  @OneToMany(
    () => MonitorNotificationHasNotificationChannels,
    (monitorNotificationHasNotificationChannels) =>
      monitorNotificationHasNotificationChannels.monitorNotification
  )
  monitorNotificationHasNotificationChannels: MonitorNotificationHasNotificationChannels[];

  @OneToMany(
    () => MonitorNotificationHasNotificationEvents,
    (monitorNotificationHasNotificationEvents) =>
      monitorNotificationHasNotificationEvents.monitorNotification
  )
  monitorNotificationHasNotificationEvents: MonitorNotificationHasNotificationEvents[];
}
