import { useEffect, useMemo, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/layout/PageHeader";
import AvailabilityCalendar from "../components/calendars/AvailabilityCalendar";
import CalendarLegend from "../components/calendars/CalendarLegend";
import RentalMiniRow from "../components/calendars/RentalMiniRow";

import { CalendarDays } from "lucide-react";
import { getCalendarAvailability } from "../services/calendar.service";
import { CalendarRentalEntry } from "../types/CalendarType";

export default function CalendarPage() {
  const [rentals, setRentals] = useState<CalendarRentalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getCalendarAvailability();
      setRentals(data);
      setLoading(false);
    })();
  }, []);

  const activeUpcoming = useMemo(() => {
    return rentals.filter(
      (r) => r.rentalStatus === "active" || r.rentalStatus === "upcoming"
    );
  }, [rentals]);

  return (
    <PageLayout title="Calendar" icon={<CalendarDays size={18} />}>
      <PageHeader
        title="Calendar & Availability"
        description="View rental schedules and car availability"
      />

      {loading ? (
        <div className="text-sm text-muted-foreground">Loading...</div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-4">
            <AvailabilityCalendar
              monthDate={activeDate}
              selectedDate={selectedDate}
              rentals={activeUpcoming}
              onChangeMonth={setActiveDate}
              onSelectDate={setSelectedDate}
            />
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 font-semibold">Active & Upcoming Rentals</div>

            <div className="space-y-2">
              {activeUpcoming.slice(0, 3).map((r) => (
                <RentalMiniRow
                  key={r.id}
                  carName={r.carName}
                  customerName={r.customerName}
                  start={r.startDate}
                  end={r.endDate}
                  status={r.rentalStatus}
                />
              ))}

              {activeUpcoming.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  No active/upcoming rentals.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 font-semibold">Legend</div>
            <CalendarLegend />
          </div>
        </div>
      )}
    </PageLayout>
  );
}