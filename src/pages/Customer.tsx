import { useEffect, useMemo, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/ui/PageHeader";
import CustomerCard from "../components/ui/CustomerCard";
import { CustomerJson } from "../types/CustomerJson";
import { Users, Filter, Search, Plus } from "lucide-react";

type StatusFilter =  "active" | "warning" | "inactive";

export default function Customers() {
  const [customers, setCustomers] = useState<CustomerJson[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load from JSON (mock). Later you can swap this to your centralized service.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/src/mocks/customers.json");
        if (!res.ok) throw new Error("Failed to load customers.json");

        const data: CustomerJson[] = await res.json();
        if (!cancelled) setCustomers(data);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load customers");
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

  return customers.filter((c) => {
    const matchesQuery =
      !q ||
      c.fullName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.address.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" ? true : c.status === statusFilter;
    return matchesQuery && matchesStatus;
  });
}, [customers, query, statusFilter]);

  return (
    <PageLayout title="Customers" icon={<Users size={18} />}>
      <PageHeader
        title="Customer Management"
        description="Manage your rental customers and their information"
        toolbar={
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
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
