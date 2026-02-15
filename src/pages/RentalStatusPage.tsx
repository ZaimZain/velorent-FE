import { useEffect, useMemo, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/layout/PageHeader";
import RentalRowCard from "../components/rentals/RentalCard";

import { RentalType, RentalStatus } from "../types/RentalType";
import { CustomerType } from "../types/CustomerType";
import { CarType } from "../types/CarType";

import { getRentals } from "../services/rentals.service";
import { getCustomers } from "../services/customers.service";
import { getCars } from "../services/cars.service";

import { ClipboardList, Search, Filter, Plus } from "lucide-react";

type RentalStatusFilter = "all" | RentalStatus;

// What the RentalCard needs (rental + joined display fields)
type JoinedRental = RentalType & {
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  car: {
    displayName: string; // e.g. "2023 Toyota Camry"
    licensePlate: string;
  };
};

export default function RentalStatusPage() {
  const [rentals, setRentals] = useState<RentalType[]>([]);
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [cars, setCars] = useState<CarType[]>([]);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RentalStatusFilter>("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Load data via centralized services (mock JSON or API, controlled by USE_API)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [rData, cData, carData] = await Promise.all([
          getRentals(),
          getCustomers(),
          getCars(),
        ]);

        if (!cancelled) {
          setRentals(rData);
          setCustomers(cData);
          setCars(carData);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load rentals data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // ✅ Lookup maps: rental.customerId -> customer, rental.carId -> car
  const customerById = useMemo(() => {
    const map = new Map<number, CustomerType>();
    customers.forEach((c) => map.set(c.id, c));
    return map;
  }, [customers]);

  const carById = useMemo(() => {
    const map = new Map<number, CarType>();
    cars.forEach((c) => map.set(c.id, c));
    return map;
  }, [cars]);

  // ✅ Join rentals with customer + car display fields
  const joined: JoinedRental[] = useMemo(() => {
    return rentals
      .map((r) => {
        const customer = customerById.get(r.customerId);
        const car = carById.get(r.carId);

        // If relations are missing, skip row (prevents crash)
        if (!customer || !car) return null;

        return {
          ...r,
          customer: {
            fullName: customer.fullName,
            email: customer.email,
            phone: customer.phone,
          },
          car: {
            displayName: `${car.year} ${car.make} ${car.model}`,
            licensePlate: car.licensePlate,
          },
        };
      })
      .filter(Boolean) as JoinedRental[];
  }, [rentals, customerById, carById]);

  // ✅ Standard search + status filter (same style as car/customer)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return joined.filter((r) => {
      const matchesQuery =
        !q ||
        r.customer.fullName.toLowerCase().includes(q) ||
        r.customer.email.toLowerCase().includes(q) ||
        r.customer.phone.toLowerCase().includes(q) ||
        r.car.displayName.toLowerCase().includes(q) ||
        r.car.licensePlate.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "all" ? true : r.rentalStatus === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [joined, query, statusFilter]);

  return (
    <PageLayout title="Rental Status" icon={<ClipboardList size={18} />}>
      <PageHeader
        title="Rental Status"
        description="Track and manage all your active and past rentals"
        toolbar={
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-input-background py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Search by customer name, car, or license plate..."
              />
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as RentalStatusFilter)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Add button */}
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95"
              onClick={() => console.log("Add New Rental")}
            >
              <Plus size={16} />
              Add New Rental
            </button>
          </div>
        }
      />

      {/* Loading/Error */}
      {loading && <div className="text-sm text-muted-foreground">Loading rentals…</div>}
      {error && <div className="text-sm text-destructive">{error}</div>}

      {/* Rows */}
      {!loading && !error && (
        <div className="space-y-5">
          {filtered.map((r) => (
            <RentalRowCard
              key={r.id}
              rental={r as any} // if your RentalCard expects JoinedRental type, you can type it properly there too
              onView={(id) => console.log("View", id)}
              onReminder={(id) => console.log("Reminder", id)}
              onEnd={(id) => console.log("End", id)}
            />
          ))}

          {filtered.length === 0 && (
            <div className="text-sm text-muted-foreground">
              No rentals found. Try another search or status filter.
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
}
