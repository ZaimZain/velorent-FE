import { useEffect, useMemo, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/layout/PageHeader";
import NotificationItem from "../components/notifications/NotificationItem";
import NotificationSettingsCard from "../components/notifications/NotificationSettingCard";
import QuickActionsCard from "../components/notifications/QuickActionCard";

import { Bell } from "lucide-react";

import {
  dismissNotification,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../services/notifications.service";
import {
  getNotificationSettings,
  updateNotificationSettings,
} from "../services/notificationSettings.service";

import { NotificationType } from "../types/NotificationType";
import { NotificationSettingsType } from "../types/NotificationSettingsType";

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationType[]>([]);
  const [settings, setSettings] = useState<NotificationSettingsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const [notifData, settingsData] = await Promise.all([
        getNotifications(),
        getNotificationSettings(),
      ]);

      setItems(notifData);
      setSettings(settingsData);
      setLoading(false);
    })();
  }, []);

  const unreadCount = useMemo(
    () => items.filter((n) => !n.read).length,
    [items]
  );

  const onMarkAllRead = async () => {
    await markAllNotificationsRead();
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const onDismiss = async (id: number) => {
    await dismissNotification(id);
    setItems((prev) => prev.filter((n) => n.id !== id));
  };

  const onMarkRead = async (id: number) => {
    await markNotificationRead(id);
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const onChangeSettings = async (next: NotificationSettingsType) => {
    setSettings(next);
    await updateNotificationSettings(next);
  };

  return (
    <PageLayout title="Notifications" icon={<Bell size={18} />}>
      <PageHeader
        title="Notifications"
        description="Stay updated with payment reminders and rental alerts"
        toolbar={
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
              {unreadCount} unread
            </div>
            <button
              className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted"
              onClick={onMarkAllRead}
            >
              Mark all as read
            </button>
          </div>
        }
      />

      {loading || !settings ? (
        <div className="text-sm text-muted-foreground">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-4">
            <div className="mb-4 font-semibold">Recent Notifications</div>

            <div className="space-y-4">
              {items.map((n) => (
                <NotificationItem
                  key={n.id}
                  item={n}
                  onDismiss={() => onDismiss(n.id)}
                  onMarkRead={() => onMarkRead(n.id)}
                />
              ))}

              {items.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  No notifications.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <NotificationSettingsCard
              settings={settings}
              onChange={onChangeSettings}
            />
            <QuickActionsCard />
          </div>
        </div>
      )}
    </PageLayout>
  );
}