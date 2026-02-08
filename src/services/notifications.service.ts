import api from "./api";
import { USE_API } from "../services/dataSource";
import notificationsMock from "../mocks/notifications.json";

export type NotificationSeverity = "low" | "medium" | "high";

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  severity: NotificationSeverity;
  tags: string[];
  created_at: string;
  read: boolean;
}

function normalizeNotification(raw: any): NotificationItem {
  return {
    id: Number(raw.id),
    title: raw.title,
    message: raw.message,
    severity: (raw.severity ?? "low") as NotificationSeverity,
    tags: raw.tags ?? [],
    created_at: raw.created_at ?? raw.createdAt ?? new Date().toISOString(),
    read: Boolean(raw.read),
  };
}

export async function getNotifications(): Promise<NotificationItem[]> {
  if (USE_API) {
    // expects GET http://localhost:8080/api/notifications
    const res = await api.get<any[]>("/notifications");
    return res.data.map(normalizeNotification);
  }
  return (notificationsMock as any[]).map(normalizeNotification);
}

export async function markAllNotificationsRead(): Promise<{ success: boolean }> {
  if (USE_API) {
    const res = await api.post<{ success: boolean }>("/notifications/mark-all-read");
    return res.data;
  }
  return { success: true };
}

export async function markNotificationRead(id: number): Promise<{ success: boolean }> {
  if (USE_API) {
    const res = await api.post<{ success: boolean }>(`/notifications/${id}/read`);
    return res.data;
  }
  return { success: true };
}

export async function dismissNotification(id: number): Promise<{ success: boolean }> {
  if (USE_API) {
    const res = await api.delete<{ success: boolean }>(`/notifications/${id}`);
    return res.data;
  }
  return { success: true };
}
