import React from "react";

type StatCardProps = {
  title: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
};

export default function StatCard({ title, value, subtext, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      {/* Top row: title + icon */}
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm text-muted-foreground">{title}</div>

        {/* Optional icon on the right */}
        {icon ? <div className="text-foreground/60">{icon}</div> : null}
      </div>

      {/* Main value */}
      <div className="mt-4 text-2xl font-semibold text-foreground">{value}</div>

      {/* Sub text (small hint) */}
      {subtext ? (
        <div className="mt-1 text-xs text-muted-foreground">{subtext}</div>
      ) : null}
    </div>
  );
}
