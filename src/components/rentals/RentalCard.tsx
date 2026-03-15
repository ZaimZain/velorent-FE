import { Rental } from "../../types/Rental";
import Pill from "../ui/Pill";
import {
  UserRound,
  Mail,
  Phone,
  Car,
  CalendarDays,
  MapPin,
  DollarSign,
} from "lucide-react";

type JoinedRental = Rental & {
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

function formatRM(n: number) {
  return `RM ${n.toFixed(2)}`;
}

function daysRemaining(end: string) {
  const endDate = new Date(end + "T00:00:00");
  const now = new Date();
  const diff = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

function rentalBadge(status: Rental["rentalStatus"]) {
  switch (status) {
    case "active":
      return <Pill variant="active">active</Pill>;
    case "upcoming":
      return <Pill variant="upcoming">upcoming</Pill>;
    case "completed":
      return <Pill variant="muted">completed</Pill>;
    case "cancelled":
      return <Pill variant="destructive">cancelled</Pill>;
  }
}

function paymentBadge(status: Rental["paymentStatus"]) {
  switch (status) {
    case "paid":
      return <Pill variant="active">paid</Pill>;
    case "partial":
      return <Pill variant="warning">partial</Pill>;
    case "unpaid":
      // UI label in screenshot is "overdue" (for unpaid)
      return <Pill variant="destructive">overdue</Pill>;
  }
}

interface Props {
  rental: JoinedRental;
  onView?: (id: number) => void;
  onEnd?: (id: number) => void;
  onReminder?: (id: number) => void;
}

export default function RentalCard({ rental, onView, onEnd, onReminder }: Props) {
  const due = Math.max(0, rental.totalAmount - rental.paidAmount);
  const remaining = daysRemaining(rental.endDate);

  // ✅ Rules you requested:
  const showSendReminder = rental.paymentStatus === "unpaid" && due > 0; // only overdue
  const showEndRental = rental.rentalStatus === "active";      // only active rentals

  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Top content (4 columns like screenshot) */}
      <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-4">
        {/* Column 1: Customer */}
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <UserRound size={16} className="text-muted-foreground" />
            Customer
          </div>

          <div className="mt-3 font-semibold">{rental.customer.fullName}</div>

          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail size={14} />
              {rental.customer.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} />
              {rental.customer.phone}
            </div>
          </div>
        </div>

        {/* Column 2: Vehicle */}
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <Car size={16} className="text-muted-foreground" />
            Vehicle
          </div>

          <div className="mt-3 font-semibold">{rental.car.displayName}</div>

          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            <div>{rental.car.licensePlate}</div>
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              {rental.pickupLocation}
            </div>
          </div>
        </div>

        {/* Column 3: Rental Period */}
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <CalendarDays size={16} className="text-muted-foreground" />
            Rental Period
          </div>

          <div className="mt-3 space-y-1 text-sm text-muted-foreground">
            <div>From: {rental.startDate}</div>
            <div>To: {rental.endDate}</div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
              {remaining >= 0 ? `${remaining} days remaining` : `${Math.abs(remaining)} days late`}
            </div>
          </div>
        </div>

        {/* Column 4: Payment */}
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <DollarSign size={16} className="text-muted-foreground" />
            Payment
          </div>

          <div className="mt-3 space-y-1 text-sm text-muted-foreground">
            <div>Total: {formatRM(rental.totalAmount)}</div>
            <div>Paid: {formatRM(rental.paidAmount)}</div>
            <div className={due > 0 ? "text-destructive font-semibold" : ""}>
              Due: {formatRM(due)}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Footer: badges + actions */}
      <div className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          {rentalBadge(rental.rentalStatus)}
          {paymentBadge(rental.paymentStatus)}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded-lg border border-border bg-muted px-4 py-2 text-sm font-semibold hover:opacity-95"
            onClick={() => onView?.(rental.id)}
          >
            View Details
          </button>

          {/* ✅ Only overdue (unpaid) */}
          {showSendReminder && (
            <button
              className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:opacity-95"
              onClick={() => onReminder?.(rental.id)}
            >
              Send Reminder
            </button>
          )}

          {/* ✅ Only Active rentals */}
          {showEndRental && (
            <button
              className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold hover:opacity-95"
              onClick={() => onEnd?.(rental.id)}
            >
              End Rental
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
