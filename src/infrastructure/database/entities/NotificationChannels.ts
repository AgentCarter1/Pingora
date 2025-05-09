import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MonitorNotificationHasNotificationChannels } from "./MonitorNotificationHasNotificationChannels";

@Index("notification_channels_pkey", ["id"], { unique: true })
@Entity("notification_channels", { schema: "public" })
export class NotificationChannels {
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
    () => MonitorNotificationHasNotificationChannels,
    (monitorNotificationHasNotificationChannels) =>
      monitorNotificationHasNotificationChannels.monitorChanel
  )
  monitorNotificationHasNotificationChannels: MonitorNotificationHasNotificationChannels[];
}
