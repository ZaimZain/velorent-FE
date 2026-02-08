import { useEffect, useMemo, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/layout/PageHeader";
import NotificationItem from "../components/notifications/NotificationItem";
import NotificationSettingsCard from "../components/notifications/NotificationSettingCard";
import QuickActionsCard from "../components/notifications/QuickActionCard";

import { Bell } from "lucide-react";

import notificationsMock from "../mocks/notifications.json";
import settingsMock from "../mocks/notificationSettings.json";

type Severity = "low" | "medium" | "high";
type Notification = {
  id: number;
  title: string;
  message: string;
  severity: Severity;
  tags: string[];
  created_at: string;
  read: boolean;
};

type Settings = {
  paymentReminders: boolean;
  rentalReminders: boolean;
  maintenanceAlerts: boolean;
  newBookings: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
};

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<Settings>(settingsMock as any);

  useEffect(() => {
    setItems(notificationsMock as any);
  }, []);

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items]);

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismiss = (id: number) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  };

  const markRead = (id: number) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <PageLayout title="Notifications" icon={<Bell size={18} />}>
      <PageHeader
        title="Notifications"
        description="Stay updated with payment reminders and rental alerts"
        right={
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
              {unreadCount} unread
            </div>
            <button
              className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted"
              onClick={markAllRead}
            >
              Mark all as read
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: notifications list */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-4">
          <div className="mb-4 font-semibold">Recent Notifications</div>

          <div className="space-y-4">
            {items.map((n) => (
              <NotificationItem
                key={n.id}
                item={n}
                onDismiss={() => dismiss(n.id)}
                onMarkRead={() => markRead(n.id)}
              />
            ))}

            {items.length === 0 && (
              <div className="text-sm text-muted-foreground">No notifications.</div>
            )}
          </div>
        </div>

        {/* Right: settings + quick actions */}
        <div className="space-y-6">
          <NotificationSettingsCard settings={settings} onChange={setSettings} />
          <QuickActionsCard />
        </div>
      </div>
    </PageLayout>
  );
}
