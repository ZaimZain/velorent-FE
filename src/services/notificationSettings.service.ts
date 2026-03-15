import api from "./api";
import { USE_API } from "../services/dataSource";
import settingsMock from "../mocks/notificationSettings.json";

export interface NotificationSettings {
  paymentReminders: boolean;
  rentalReminders: boolean;
  maintenanceAlerts: boolean;
  newBookings: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

function normalizeSettings(raw: any): NotificationSettings {
  return {
    paymentReminders: Boolean(raw.paymentReminders ?? raw.payment_reminders),
    rentalReminders: Boolean(raw.rentalReminders ?? raw.rental_reminders),
    maintenanceAlerts: Boolean(raw.maintenanceAlerts ?? raw.maintenance_alerts),
    newBookings: Boolean(raw.newBookings ?? raw.new_bookings),
    emailNotifications: Boolean(raw.emailNotifications ?? raw.email_notifications),
    smsNotifications: Boolean(raw.smsNotifications ?? raw.sms_notifications),
  };
}

export async function getNotificationSettings(): Promise<NotificationSettings> {
  if (USE_API) {
    // expects GET http://localhost:8080/api/notification-settings
    const res = await api.get<any>("/notification-settings");
    return normalizeSettings(res.data);
  }
  return normalizeSettings(settingsMock);
}

export async function updateNotificationSettings(
  payload: Partial<NotificationSettings>
): Promise<{ success: boolean }> {
  if (USE_API) {
    const res = await api.put<{ success: boolean }>("/notification-settings", payload);
    return res.data;
  }
  return { success: true };
}
