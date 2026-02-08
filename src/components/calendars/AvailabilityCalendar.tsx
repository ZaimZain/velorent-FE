import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

type RentalLite = {
  id: number;
  start_date: string;
  end_date: string;
  rental_status: "ACTIVE" | "UPCOMING" | "COMPLETED" | "CANCELLED";
  carName: string;
  customerName: string;
};

type Props = {
  monthDate: Date;
  selectedDate: Date;
  rentals: RentalLite[];
  onChangeMonth: (d: Date) => void;
  onSelectDate: (d: Date) => void;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isToday(d: Date) {
  return sameDay(d, new Date());
}
function addMonths(d: Date, delta: number) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}
function formatMonthYear(d: Date) {
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}
function toISODate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function inRange(dateISO: string, startISO: string, endISO: string) {
  return dateISO >= startISO && dateISO <= endISO;
}

export default function AvailabilityCalendar({
  monthDate,
  selectedDate,
  rentals,
  onChangeMonth,
  onSelectDate,
}: Props) {
  const first = startOfMonth(monthDate);
  const last = endOfMonth(monthDate);

  const startDay = first.getDay(); // 0-6
  const totalDays = last.getDate();

  // Create cells: leading blanks + days
  const cells: Array<Date | null> = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let day = 1; day <= totalDays; day++) {
    cells.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day));
  }

  // rentals for a specific day (active/upcoming only already filtered by caller)
  const rentalsForDay = (d: Date) => {
    const iso = toISODate(d);
    return rentals.filter((r) => inRange(iso, r.start_date, r.end_date));
  };

  return (
    <div className="space-y-4">
      {/* Calendar top row (like screenshot) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <CalendarDays size={16} className="text-muted-foreground" />
          {formatMonthYear(monthDate)}
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Month</div>
          <button
            className="h-9 w-9 rounded-lg border border-border bg-card hover:bg-muted"
            onClick={() => onChangeMonth(addMonths(monthDate, -1))}
            aria-label="Previous month"
          >
            <ChevronLeft size={16} className="mx-auto" />
          </button>
          <button
            className="h-9 w-9 rounded-lg border border-border bg-card hover:bg-muted"
            onClick={() => onChangeMonth(addMonths(monthDate, 1))}
            aria-label="Next month"
          >
            <ChevronRight size={16} className="mx-auto" />
          </button>
        </div>
      </div>

      {/* Weekdays header */}
      <div className="grid grid-cols-7 gap-2 px-1 text-center text-sm text-muted-foreground">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-2">
            {w}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {cells.map((cell, idx) => {
          if (!cell) {
            return <div key={idx} className="h-24 rounded-xl border border-transparent" />;
          }

          const selected = sameDay(cell, selectedDate);
          const today = isToday(cell);
          const dayRentals = rentalsForDay(cell);

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(cell)}
              className={[
                "h-24 rounded-xl border bg-card text-left p-2 align-top hover:bg-muted/40",
                selected ? "border-sidebar-ring ring-1 ring-sidebar-ring" : "border-border",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <div className={today ? "font-semibold text-primary" : "text-sm text-foreground"}>
                  {cell.getDate()}
                </div>
              </div>

              {/* Show car + customer for ACTIVE/UPCOMING only */}
              <div className="mt-2 space-y-1">
                {dayRentals.slice(0, 2).map((r) => (
                  <div
                    key={r.id}
                    className="truncate rounded-md bg-accent px-2 py-1 text-[11px] text-accent-foreground"
                    title={`${r.carName} • ${r.customerName}`}
                  >
                    {r.carName} • {r.customerName}
                  </div>
                ))}

                {dayRentals.length > 2 && (
                  <div className="text-[11px] text-muted-foreground">+{dayRentals.length - 2} more</div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
