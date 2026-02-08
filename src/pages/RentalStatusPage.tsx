import { useEffect, useMemo, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/layout/PageHeader";
import RentalRowCard from "../components/rentals/RentalCard";
import { Rental, RentalStatus } from "../types/Rental";
import { ClipboardList, Search, Filter, Plus } from "lucide-react";

// Replace these with your real interfaces if you already have them
type CustomerMock = { id: number; fullName: string; email: string; phone: string };
type CarMock = { id: number; make: string; model: string; year: number; licensePlate: string };

type RentalStatusFilter = "all" | RentalStatus;

export default function RentalStatusPage() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [customers, setCustomers] = useState<CustomerMock[]>([]);
  const [cars, setCars] = useState<CarMock[]>([]);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RentalStatusFilter>("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load mocks (later swap to API service)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [rRes, cRes, carRes] = await Promise.all([
          fetch("/src/mocks/rentals.json"),
          fetch("/src/mocks/customers.json"),
          fetch("/src/mocks/cars.json"),
        ]);

        if (!rRes.ok) throw new Error("Failed to load rentals.json");
        if (!cRes.ok) throw new Error("Failed to load customers.json");
        if (!carRes.ok) throw new Error("Failed to load cars.json");

        const [rData, cData, carData] = await Promise.all([
          rRes.json(),
          cRes.json(),
          carRes.json(),
        ]);

        if (!cancelled) {
          setRentals(rData);
          setCustomers(cData);
          setCars(carData);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Build lookup maps for joining rentals -> customers/cars (best practice for normalized frontend data)
  const customerById = useMemo(() => {
    const map = new Map<number, CustomerMock>();
    customers.forEach((c) => map.set(c.id, c));
    return map;
  }, [customers]);

  const carById = useMemo(() => {
    const map = new Map<number, CarMock>();
    cars.forEach((c) => map.set(c.id, c));
    return map;
  }, [cars]);

  // Join rentals with customer + car display fields for UI
  const joined = useMemo(() => {
    return rentals
      .map((r) => {
        const customer = customerById.get(r.customer_id);
        const car = carById.get(r.car_id);

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
      .filter(Boolean);
  }, [rentals, customerById, carById]);

  // Standard search + status filter (same style as your Car filter)
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

      const matchesStatus = statusFilter === "all" ? true : r.rental_status === statusFilter;

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
            {/* Search (full width like screenshot) */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-input-background py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Search by customer name, car, or license plate..."
              />
            </div>

            {/* Status filter (one dropdown like screenshot) */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as RentalStatusFilter)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="UPCOMING">Upcoming</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            {/* Add button (right aligned like screenshot) */}
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

      {/* List of row cards */}
      {!loading && !error && (
        <div className="space-y-5">
          {filtered.map((r) => (
            <RentalRowCard
              key={r.id}
              rental={r as any}
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
