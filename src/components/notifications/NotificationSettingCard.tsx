import { Settings } from "lucide-react";

type SettingsState = {
  paymentReminders: boolean;
  rentalReminders: boolean;
  maintenanceAlerts: boolean;
  newBookings: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
};

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="text-sm">{label}</div>
      <button
        className={[
          "h-6 w-11 rounded-full border border-border transition relative",
          value ? "bg-primary" : "bg-muted",
        ].join(" ")}
        onClick={() => onChange(!value)}
        aria-label={label}
      >
        <span
          className={[
            "absolute top-0.5 h-5 w-5 rounded-full bg-card transition",
            value ? "right-0.5" : "left-0.5",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

export default function NotificationSettingsCard({
  settings,
  onChange,
}: {
  settings: SettingsState;
  onChange: (s: SettingsState) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2 font-semibold">
        <Settings size={16} className="text-muted-foreground" />
        Notification Settings
      </div>

      <div className="space-y-2">
        <Toggle
          label="Payment Reminders"
          value={settings.paymentReminders}
          onChange={(v) => onChange({ ...settings, paymentReminders: v })}
        />
        <Toggle
          label="Rental Reminders"
          value={settings.rentalReminders}
          onChange={(v) => onChange({ ...settings, rentalReminders: v })}
        />
        <Toggle
          label="Maintenance Alerts"
          value={settings.maintenanceAlerts}
          onChange={(v) => onChange({ ...settings, maintenanceAlerts: v })}
        />
        <Toggle
          label="New Bookings"
          value={settings.newBookings}
          onChange={(v) => onChange({ ...settings, newBookings: v })}
        />

        <div className="my-3 h-px bg-border" />

        <div className="font-semibold text-sm">Delivery Method</div>

        <Toggle
          label="Email Notifications"
          value={settings.emailNotifications}
          onChange={(v) => onChange({ ...settings, emailNotifications: v })}
        />
        <Toggle
          label="SMS Notifications"
          value={settings.smsNotifications}
          onChange={(v) => onChange({ ...settings, smsNotifications: v })}
        />
      </div>
    </div>
  );
}
