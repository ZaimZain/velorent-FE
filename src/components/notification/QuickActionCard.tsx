import { DollarSign, CalendarDays, Wrench } from "lucide-react";

function ActionBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-muted px-4 py-2 text-sm font-semibold hover:bg-muted/70">
      <span className="text-muted-foreground">{icon}</span>
      {label}
    </button>
  );
}

export default function QuickActionsCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 font-semibold">Quick Actions</div>

      <div className="space-y-3">
        <ActionBtn icon={<DollarSign size={16} />} label="Send Payment Reminders" />
        <ActionBtn icon={<CalendarDays size={16} />} label="Check Upcoming Rentals" />
        <ActionBtn icon={<Wrench size={16} />} label="Schedule Maintenance" />
      </div>
    </div>
  );
}
