import { useEffect, useMemo, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/layout/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import ActivityItem from "../components/dashboard/ActivityItem";

import { getCars } from "../services/cars.service";
import { getCustomers } from "../services/customers.service";
import { getRentals } from "../services/rentals.service";

import { Car as CarType } from "../types/Car";
import { Customer } from "../types/Customer";
import { Rental } from "../types/Rental";

import {
  LayoutDashboard,
  Car,
  Users,
  DollarSign,
  CalendarDays,
} from "lucide-react";

// ---------- helpers ----------
function formatRM(n: number) {
  return `RM ${n.toLocaleString("en-MY")}`;
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function daysBetween(fromIso: string, toIso: string) {
  const a = new Date(fromIso);
  const b = new Date(toIso);
  const diff = b.getTime() - a.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

type ActivityType = "active" | "warning" | "completed" | "info";

type ActivityItemVm = {
  id: string;
  title: string;
  subtitle: string;
  type: ActivityType;
  timeLabel: string;
};

export default function DashboardPage() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [carsRes, customersRes, rentalsRes] = await Promise.all([
        getCars(),
        getCustomers(),
        getRentals(),
      ]);
      setCars(carsRes);
      setCustomers(customersRes);
      setRentals(rentalsRes);
      setLoading(false);
    })();
  }, []);

  // Quick lookup maps for display text (avoid repeating data in rentals)
  const carById = useMemo(() => {
    const m = new Map<number, CarType>();
    cars.forEach((c) => m.set(c.id, c));
    return m;
  }, [cars]);

  const customerById = useMemo(() => {
    const m = new Map<number, Customer>();
    customers.forEach((c) => m.set(c.id, c));
    return m;
  }, [customers]);

  // ---------- derived stats ----------
  const stats = useMemo(() => {
    const totalCars = cars.length;

    const activeRentals = rentals.filter((r) => r.rental_status === "ACTIVE").length;

    const availableCars = cars.filter((c) => c.status === "AVAILABLE").length;

    // Monthly revenue: sum rentals that overlap current month (simple version: start_date in month)
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const monthlyRevenue = rentals
      .filter((r) => {
        const s = new Date(r.start_date);
        return s >= monthStart && s <= monthEnd;
      })
      .reduce((sum, r) => sum + (r.total_amount ?? 0), 0);

    return { totalCars, activeRentals, availableCars, monthlyRevenue };
  }, [cars, rentals]);

  // ---------- derived recent activities ----------
  const activities: ActivityItemVm[] = useMemo(() => {
    const now = new Date();

    // Sort rentals by updated_at (fallback to created_at)
    const sorted = [...rentals].sort((a, b) => {
      const ta = new Date(a.updated_at ?? a.created_at).getTime();
      const tb = new Date(b.updated_at ?? b.created_at).getTime();
      return tb - ta;
    });

    // Convert rentals into “activity” rows similar to screenshot.
    const items: ActivityItemVm[] = sorted.slice(0, 4).map((r) => {
      const car = carById.get(r.car_id);
      const cust = customerById.get(r.customer_id);

      const carLabel = car ? `${car.make} ${car.model} ${car.year}` : `Car #${r.car_id}`;
      const custLabel = cust ? cust.fullName : `Customer #${r.customer_id}`;

      // Determine type/title
      const due = Math.max(0, (r.total_amount ?? 0) - (r.paid_amount ?? 0));

      let type: ActivityType = "info";
      let title = "Updated rental";

      if (r.rental_status === "ACTIVE") {
        title = "New rental started";
        type = "active";
      }
      if (r.rental_status === "COMPLETED") {
        title = "Car returned";
        type = "completed";
      }
      if (r.payment_status === "UNPAID" || (r.payment_status === "PARTIAL" && due > 0)) {
        title = "Payment due";
        type = "warning";
      }

      // Time label: “X days ago” (simple)
      const updated = new Date(r.updated_at ?? r.created_at);
      const daysAgo = Math.max(0, Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24)));
      const timeLabel = daysAgo === 0 ? "Today" : `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;

      return {
        id: `rental-${r.id}`,
        title,
        subtitle: `${custLabel} • ${carLabel}`,
        type,
        timeLabel,
      };
    });

    // If you want: add “New car added” when cars updated recently (optional)
    // (Only if you have created_at/updated_at in car JSON)
    // Otherwise keep only rentals-based activities.

    return items;
  }, [rentals, carById, customerById]);

  return (
    <PageLayout title="Dashboard" icon={<LayoutDashboard size={18} />}>
      <PageHeader
        title="Dashboard"
        description="Welcome to your car rental management system"
      />

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Cars"
          value={loading ? "-" : String(stats.totalCars)}
          subtext="+2 from last month"
          icon={<Car size={18} />}
        />
        <StatCard
          title="Active Rentals"
          value={loading ? "-" : String(stats.activeRentals)}
          subtext="+12% from last month"
          icon={<Users size={18} />}
        />
        <StatCard
          title="Monthly Revenue"
          value={loading ? "-" : formatRM(stats.monthlyRevenue)}
          subtext="+8% from last month"
          icon={<DollarSign size={18} />}
        />
        <StatCard
          title="Available Cars"
          value={loading ? "-" : String(stats.availableCars)}
          subtext="Ready to rent"
          icon={<CalendarDays size={18} />}
        />
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="text-base font-semibold">Recent Activities</div>

        <div className="mt-4 space-y-3">
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : activities.length === 0 ? (
            <div className="text-sm text-muted-foreground">No activities yet.</div>
          ) : (
            activities.map((a) => <ActivityItem key={a.id} item={a} />)
          )}
        </div>
      </div>
    </PageLayout>
  );
}
