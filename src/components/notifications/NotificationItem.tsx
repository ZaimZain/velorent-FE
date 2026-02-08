import { X, DollarSign, CalendarDays, Wrench, CheckCircle2 } from "lucide-react";

type Severity = "low" | "medium" | "high";

type Notification = {
  title: string;
  message: string;
  severity: Severity;
  tags: string[];
  created_at: string;
  read: boolean;
};

function severityStyle(sev: Severity) {
  if (sev === "high") return "bg-red-100 text-red-700";
  if (sev === "medium") return "bg-yellow-100 text-yellow-700";
  return "bg-blue-100 text-blue-700";
}

function iconFor(title: string) {
  const t = title.toLowerCase();
  if (t.includes("pembayaran") || t.includes("payment")) return <DollarSign size={16} />;
  if (t.includes("sewa") || t.includes("rental")) return <CalendarDays size={16} />;
  if (t.includes("selenggara") || t.includes("maintenance")) return <Wrench size={16} />;
  return <CheckCircle2 size={16} />;
}

export default function NotificationItem({
  item,
  onDismiss,
  onMarkRead,
}: {
  item: Notification;
  onDismiss: () => void;
  onMarkRead: () => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground">
            {iconFor(item.title)}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="font-semibold">{item.title}</div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${severityStyle(item.severity)}`}>
                {item.severity}
              </span>
            </div>

            <div className="mt-1 text-sm text-muted-foreground">{item.message}</div>

            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span key={t} className="rounded-full border border-border bg-muted px-3 py-1 text-xs">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.read ? "read" : "unread"}</span>

              {!item.read && (
                <button className="text-foreground hover:underline" onClick={onMarkRead}>
                  Mark as read
                </button>
              )}
            </div>
          </div>
        </div>

        <button
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
