import { useEffect, useMemo, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/layout/PageHeader";
import CustomerCard from "../components/customers/CustomerCard";

import { CustomerType, CustomerStatus } from "../types/CustomerType";
import { RentalType } from "../types/RentalType";
import { CarType } from "../types/CarType";
import { CustomerVM } from "../types/CustomerVM";

import { getCustomers } from "../services/customers.service";
import { getRentals } from "../services/rentals.service";
import { getCars } from "../services/cars.service";

import { Users, Filter, Search, Plus } from "lucide-react";

type StatusFilter = "all" | CustomerStatus;

export default function CustomerPage() {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [rentals, setRentals] = useState<RentalType[]>([]);
  const [cars, setCars] = useState<CarType[]>([]);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Load via services (USE_API toggle lives inside services)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [customersData, rentalsData, carsData] = await Promise.all([
          getCustomers(),
          getRentals(),
          getCars(),
        ]);

        if (!cancelled) {
          setCustomers(customersData);
          setRentals(rentalsData);
          setCars(carsData);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load customer data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Build lookup maps for faster joins (customer -> rentals -> car name)
  const carById = useMemo(() => {
    const map = new Map<number, CarType>();
    cars.forEach((c) => map.set(c.id, c));
    return map;
  }, [cars]);

  const rentalsByCustomerId = useMemo(() => {
    const map = new Map<number, RentalType[]>();
    rentals.forEach((r) => {
      const arr = map.get(r.customerId) ?? [];
      arr.push(r);
      map.set(r.customerId, arr);
    });
    return map;
  }, [rentals]);

  // Derive UI fields: totalRentals, totalSpent, currentRental (from rentals)
  const customersVM: CustomerVM[] = useMemo(() => {
    return customers.map((c) => {
      const custRentals = rentalsByCustomerId.get(c.id) ?? [];

      const totalRentals = custRentals.length;

      const totalSpent = custRentals.reduce(
        (sum, r) => sum + (r.totalAmount ?? 0),
        0
      );

      // ✅ Your RentalType uses lowercase statuses: "active" | "upcoming" | ...
      // Find active rental (or UPCOMING if no active)
      const active = custRentals.find((r) => r.rentalStatus === "active");
      const upcoming = custRentals.find((r) => r.rentalStatus === "upcoming");
      const current = active ?? upcoming ?? null;

      let currentRental: CustomerVM["currentRental"] = null;

      if (current) {
        const car = carById.get(current.carId);
        const carName = car
          ? `${car.make} ${car.model} ${car.year}`
          : `Car #${current.carId}`;

        currentRental = {
          carName,
          startDate: current.startDate,
          endDate: current.endDate,
        };
      }

      return {
        ...c,
        totalRentals,
        totalSpent,
        currentRental,
      };
    });
  }, [customers, rentalsByCustomerId, carById]);

  // Search + filter logic (same style as your car filter)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return customersVM.filter((c) => {
      const matchesQuery =
        !q ||
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "all" ? true : c.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [customersVM, query, statusFilter]);

  return (
    <PageLayout title="Customers" icon={<Users size={18} />}>
      <PageHeader
        title="Customer Management"
        description="Manage your rental customers and their information"
        toolbar={
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-input-background text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                placeholder="Search by name, email, or phone number..."
              />
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="warning">Warning</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Add button */}
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-95"
              onClick={() => console.log("Add Customer")}
            >
              <Plus size={16} />
              Add Customer
            </button>
          </div>
        }
      />

      {/* Loading / error */}
      {loading ? <div className="text-sm text-muted-foreground">Loading customers…</div> : null}
      {error ? <div className="text-sm text-destructive">{error}</div> : null}

      {/* Cards grid */}
      {!loading && !error ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((c) => (
            <CustomerCard
              key={c.id}
              customer={c}
              totalRentals={c.totalRentals}
              totalSpent={c.totalSpent}
              currentRental={c.currentRental}
              onEdit={(id) => console.log("Edit customer", id)}
              onDelete={(id) => console.log("Delete customer", id)}
            />
          ))}

          {filtered.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No customers found. Try another search.
            </div>
          ) : null}
        </div>
      ) : null}
    </PageLayout>
  );
}
