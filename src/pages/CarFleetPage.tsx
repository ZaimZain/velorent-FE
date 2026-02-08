import { useEffect, useMemo, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/ui/PageHeader";
import CarCard from "../components/cars/CarCard";
import { CarFleetJson } from "../types/CarFleetJson";
import { Car as CarIcon, Filter, Search, Plus } from "lucide-react";

type StatusFilter = "all" | "available" | "rented" | "maintenance";

export default function CarFleetPage() {
  const [cars, setCars] = useState<CarFleetJson[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load car data from JSON
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/src/mocks/cars.json");
        if (!res.ok) throw new Error("Failed to load cars.json");

        const data: CarFleetJson[] = await res.json();
        if (!cancelled) setCars(data);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load cars");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Search + filter logic
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return cars.filter((c) => {
      const matchesQuery =
        !q ||
        `${c.make} ${c.model}`.toLowerCase().includes(q) ||
        String(c.year).includes(q) ||
        c.licensePlate.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "all" ? true : c.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [cars, query, statusFilter]);

  return (
    <PageLayout title="Car Fleet" icon={<CarIcon size={18} />}>
      <PageHeader
        title="Car Fleet"
        description="Manage your rental car inventory"
        toolbar={
          // Toolbar row: Search + Filter + Add button
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-input-background text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                placeholder="Search by make, model, year, or license plate..."
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
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Add button */}
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-95"
              onClick={() => console.log("Add new car")}
            >
              <Plus size={16} />
              Add New Car
            </button>
          </div>
        }
      />

      {/* Loading/Error */}
      {loading ? <div className="text-sm text-muted-foreground">Loading cars…</div> : null}
      {error ? <div className="text-sm text-destructive">{error}</div> : null}

      {/* Cars grid */}
      {!loading && !error ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onEdit={(id) => console.log("Edit", id)}
              onDelete={(id) => console.log("Delete", id)}
            />
          ))}

          {filtered.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No cars found. Try another search or filter.
            </div>
          ) : null}
        </div>
      ) : null}
    </PageLayout>
  );
}
