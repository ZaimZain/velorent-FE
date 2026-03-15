import { useEffect, useMemo, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/layout/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import ActivityItem from "../components/dashboard/ActivityItem";

import { getCars } from "../services/cars.service";
import { getCustomers } from "../services/customers.service";
import { getRentals } from "../services/rentals.service";

import { CarType } from "../types/CarType";
import { CustomerType } from "../types/CustomerType";
import { RentalType } from "../types/RentalType";

import { LayoutDashboard, Car, Users, DollarSign, CalendarDays } from "lucide-react";

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
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [rentals, setRentals] = useState<RentalType[]>([]);
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

  // Lookup maps (normalized approach)
  const carById = useMemo(() => {
    const m = new Map<number, CarType>();
    cars.forEach((c) => m.set(c.id, c));
    return m;
  }, [cars]);

  const customerById = useMemo(() => {
    const m = new Map<number, CustomerType>();
    customers.forEach((c) => m.set(c.id, c));
    return m;
  }, [customers]);

  // ---------- derived stats ----------
  const stats = useMemo(() => {
    const totalCars = cars.length;

    const activeRentals = rentals.filter((r) => r.rentalStatus === "active").length;

    const availableCars = cars.filter((c) => c.status === "available").length;

    // Monthly revenue: sum rentals starting in current month (simple version)
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const monthlyRevenue = rentals
      .filter((r) => {
        const s = new Date(r.startDate);
        return s >= monthStart && s <= monthEnd;
      })
      .reduce((sum, r) => sum + (r.totalAmount ?? 0), 0);

    return { totalCars, activeRentals, availableCars, monthlyRevenue };
  }, [cars, rentals]);

  // ---------- derived recent activities ----------
  const activities: ActivityItemVm[] = useMemo(() => {
    const now = new Date();

    const sorted = [...rentals].sort((a, b) => {
      const ta = new Date(a.updatedAt ?? a.createdAt).getTime();
      const tb = new Date(b.updatedAt ?? b.createdAt).getTime();
      return tb - ta;
    });

    return sorted.slice(0, 4).map((r) => {
      const car = carById.get(r.carId);
      const cust = customerById.get(r.customerId);

      const carLabel = car ? `${car.make} ${car.model} ${car.year}` : `Car #${r.carId}`;
      const custLabel = cust ? cust.fullName : `Customer #${r.customerId}`;

      const due = Math.max(0, (r.totalAmount ?? 0) - (r.paidAmount ?? 0));

      let type: ActivityType = "info";
      let title = "Updated rental";

      if (r.rentalStatus === "active") {
        title = "New rental started";
        type = "active";
      }

      if (r.rentalStatus === "completed") {
        title = "Car returned";
        type = "completed";
      }

      // Payment due warning
      if (r.paymentStatus === "unpaid" || (r.paymentStatus === "partial" && due > 0)) {
        title = "Payment due";
        type = "warning";
      }

      const updated = new Date(r.updatedAt ?? r.createdAt);
      const daysAgo = Math.max(
        0,
        Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24))
      );
      const timeLabel = daysAgo === 0 ? "Today" : `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;

      return {
        id: `rental-${r.id}`,
        title,
        subtitle: `${custLabel} • ${carLabel}`,
        type,
        timeLabel,
      };
    });
  }, [rentals, carById, customerById]);

  return (
    <PageLayout title="Dashboard" icon={<LayoutDashboard size={18} />}>
      <PageHeader title="Dashboard" description="Welcome to your car rental management system" />

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
