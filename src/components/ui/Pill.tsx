type PillVariant = "active" | "warning" | "upcoming" | "completed" | "info" | "muted";

const variants: Record<PillVariant, string> = {
  active: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  upcoming: "bg-blue-100 text-blue-700",
  completed: "bg-slate-100 text-slate-700",
  info: "bg-secondary text-secondary-foreground",
  muted: "bg-muted text-muted-foreground",
};

export default function Pill({ children, variant = "muted" }: { children: React.ReactNode; variant?: PillVariant }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
}
