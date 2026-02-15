import { useEffect, useMemo, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/layout/PageHeader";
import AvailabilityCalendar from "../components/calendars/AvailabilityCalendar";
import CalendarLegend from "../components/calendars/CalendarLegend";
import RentalMiniRow from "../components/calendars/RentalMiniRow";

import { CalendarDays } from "lucide-react";
import { getRentals } from "../services/rentals.service";

// If you already have real types, use them
import { RentalType } from "../types/RentalType";
import carsMock from "../mocks/cars.json";
import customersMock from "../mocks/customers.json";

type Customer = { id: number; fullName: string };
type Car = { id: number; make: string; model: string; year: number };

type JoinedRental = RentalType & {
  customerName: string;
  carName: string;
};

function joinRentals(rentals: RentalType[], cars: Car[], customers: Customer[]): JoinedRental[] {
  const carById = new Map<number, Car>(cars.map((c) => [c.id, c]));
  const customerById = new Map<number, Customer>(customers.map((c) => [c.id, c]));

  return rentals
    .map((r) => {
      const car = carById.get(r.car_id);
      const customer = customerById.get(r.customer_id);
      if (!car || !customer) return null;

      return {
        ...r,
        carName: `${car.make} ${car.model} ${car.year}`,
        customerName: customer.fullName,
      };
    })
    .filter(Boolean) as JoinedRental[];
}

export default function CalendarPage() {
  const [rentals, setRentals] = useState<RentalType[]>([]);
  const [loading, setLoading] = useState(true);

  // Calendar state
  const [activeDate, setActiveDate] = useState<Date>(new Date()); // month display
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // selected day

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getRentals();
      setRentals(data);
      setLoading(false);
    })();
  }, []);

  // Join rentals with car + customer names
  const joined = useMemo(() => {
    return joinRentals(
      rentals,
      carsMock as any,
      customersMock as any
    );
  }, [rentals]);

  // Calendar should show only ACTIVE + UPCOMING
  const activeUpcoming = useMemo(() => {
    return joined.filter((r) => r.rental_status === "ACTIVE" || r.rental_status === "UPCOMING");
  }, [joined]);

  return (
    <PageLayout title="Calendar" icon={<CalendarDays size={18} />}>
      <PageHeader
        title="Calendar & Availability"
        description="View rental schedules and car availability"
      />

      {loading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : (
        <div className="space-y-6">
          {/* Calendar big card */}
          <div className="rounded-xl border border-border bg-card p-4">
            <AvailabilityCalendar
              monthDate={activeDate}
              selectedDate={selectedDate}
              rentals={activeUpcoming}
              onChangeMonth={setActiveDate}
              onSelectDate={setSelectedDate}
            />
          </div>

          {/* Active & Upcoming Rentals card (like screenshot) */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 font-semibold">Active & Upcoming Rentals</div>

            <div className="space-y-2">
              {activeUpcoming.slice(0, 3).map((r) => (
                <RentalMiniRow
                  key={r.id}
                  carName={r.carName}
                  customerName={r.customerName}
                  start={r.start_date}
                  end={r.end_date}
                  status={r.rental_status}
                />
              ))}

              {activeUpcoming.length === 0 && (
                <div className="text-sm text-muted-foreground">No active/upcoming rentals.</div>
              )}
            </div>
          </div>

          {/* Legend card */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 font-semibold">Legend</div>
            <CalendarLegend />
          </div>
        </div>
      )}
    </PageLayout>
  );
}
