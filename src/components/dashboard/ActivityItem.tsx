import React from "react";

type ActivityType = "active" | "warning" | "completed" | "info";

export type ActivityVm = {
  title: string;
  subtitle: string;
  type: ActivityType;
  timeLabel: string;
};

function badgeClass(type: ActivityType) {
  switch (type) {
    case "active":
      return "bg-primary text-primary-foreground";
    case "warning":
      return "bg-destructive text-destructive-foreground";
    case "completed":
      return "bg-muted text-foreground";
    case "info":
    default:
      return "bg-secondary text-secondary-foreground";
  }
}

function dotClass(type: ActivityType) {
  switch (type) {
    case "active":
      return "bg-green-500";
    case "warning":
      return "bg-yellow-500";
    case "completed":
      return "bg-blue-500";
    case "info":
    default:
      return "bg-slate-500";
  }
}

export default function ActivityItem({ item }: { item: ActivityVm }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
      {/* Left: dot + text */}
      <div className="flex items-start gap-3">
        <span className={`mt-2 h-2 w-2 rounded-full ${dotClass(item.type)}`} />

        <div>
          <div className="font-medium text-foreground">{item.title}</div>
          <div className="text-sm text-muted-foreground">{item.subtitle}</div>
        </div>
      </div>

      {/* Right: badge + time */}
      <div className="flex flex-col items-end gap-1">
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${badgeClass(item.type)}`}
        >
          {item.type}
        </span>
        <span className="text-xs text-muted-foreground">{item.timeLabel}</span>
      </div>
    </div>
  );
}
