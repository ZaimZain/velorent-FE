export type NotificationSeverity = "low" | "medium" | "high";
export type NotificationKind =
  | "paymentReminder"
  | "rentalReminder"
  | "maintenanceAlert"
  | "newBooking"
  | "system";

export interface NotificationType {
  id: number;
  title: string;
  message: string;
  severity: NotificationSeverity;
  kind?: NotificationKind;
  tags: string[];
  createdAt: string;
  read: boolean;

  // optional links for future backend usage
  customerId?: number;
  carId?: number;
  rentalId?: number;
}