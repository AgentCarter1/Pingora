import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MonitorNotificationHasNotificationEvents } from "./MonitorNotificationHasNotificationEvents";

@Index("notification_events_pkey", ["id"], { unique: true })
@Entity("notification_events", { schema: "public" })
export class NotificationEvents {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

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

  @OneToMany(
    () => MonitorNotificationHasNotificationEvents,
    (monitorNotificationHasNotificationEvents) =>
      monitorNotificationHasNotificationEvents.monitorEvent
  )
  monitorNotificationHasNotificationEvents: MonitorNotificationHasNotificationEvents[];
}
