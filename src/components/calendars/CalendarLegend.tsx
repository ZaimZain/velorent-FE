export default function CalendarLegend() {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="h-4 w-4 rounded bg-green-100 ring-1 ring-green-200" />
        Active Rental
      </div>
      <div className="flex items-center gap-2">
        <span className="h-4 w-4 rounded bg-blue-100 ring-1 ring-blue-200" />
        Upcoming Rental
      </div>
      <div className="flex items-center gap-2">
        <span className="h-4 w-4 rounded bg-gray-100 ring-1 ring-gray-200" />
        Completed Rental
      </div>
      <div className="flex items-center gap-2">
        <span className="h-4 w-4 rounded border-2 border-sidebar-ring bg-card" />
        Today / Selected
      </div>
    </div>
  );
}
