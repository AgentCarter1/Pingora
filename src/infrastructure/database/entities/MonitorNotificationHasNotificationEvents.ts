import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NotificationEvents } from "./NotificationEvents";
import { MonitorNotification } from "./MonitorNotification";

@Index(
  "monitor_notification_has_notification_events_pkey",
  ["monitorEventId", "monitorNotificationId"],
  { unique: true }
)
@Index(
  "index_monitor_notification_id_notification_event_id",
  ["monitorEventId", "monitorNotificationId"],
  { unique: true }
)
@Entity("monitor_notification_has_notification_events", { schema: "public" })
export class MonitorNotificationHasNotificationEvents {
  @Column("uuid", { primary: true, name: "monitor_notification_id" })
  monitorNotificationId: string;

  @PrimaryGeneratedColumn({ type: "bigint", name: "monitor_event_id" })
  monitorEventId: string;

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
    () => NotificationEvents,
    (notificationEvents) =>
      notificationEvents.monitorNotificationHasNotificationEvents
  )
  @JoinColumn([{ name: "monitor_event_id", referencedColumnName: "id" }])
  monitorEvent: NotificationEvents;

  @ManyToOne(
    () => MonitorNotification,
    (monitorNotification) =>
      monitorNotification.monitorNotificationHasNotificationEvents
  )
  @JoinColumn([{ name: "monitor_notification_id", referencedColumnName: "id" }])
  monitorNotification: MonitorNotification;
}
