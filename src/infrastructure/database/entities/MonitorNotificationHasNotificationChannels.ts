import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NotificationChannels } from "./NotificationChannels";
import { MonitorNotification } from "./MonitorNotification";

@Index(
  "index_monitor_notification_id_notification_channel_id",
  ["monitorChanelId", "monitorNotificationId"],
  { unique: true }
)
@Index(
  "monitor_notification_has_notification_channel_pkey",
  ["monitorChanelId", "monitorNotificationId"],
  { unique: true }
)
@Entity("monitor_notification_has_notification_channels", { schema: "public" })
export class MonitorNotificationHasNotificationChannels {
  @Column("uuid", { primary: true, name: "monitor_notification_id" })
  monitorNotificationId: string;

  @PrimaryGeneratedColumn({ type: "bigint", name: "monitor_chanel_id" })
  monitorChanelId: string;

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
    () => NotificationChannels,
    (notificationChannels) =>
      notificationChannels.monitorNotificationHasNotificationChannels
  )
  @JoinColumn([{ name: "monitor_chanel_id", referencedColumnName: "id" }])
  monitorChanel: NotificationChannels;

  @ManyToOne(
    () => MonitorNotification,
    (monitorNotification) =>
      monitorNotification.monitorNotificationHasNotificationChannels
  )
  @JoinColumn([{ name: "monitor_notification_id", referencedColumnName: "id" }])
  monitorNotification: MonitorNotification;
}
