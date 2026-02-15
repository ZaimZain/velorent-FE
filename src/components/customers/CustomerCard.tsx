import { Mail, MapPin, Phone, Pencil, Trash2 } from "lucide-react";
import Pill from "../ui/Pill";
import { CustomerJson } from "../../types/CustomerJson";

function statusBadge(status: CustomerJson["status"]) {
  if (status === "active") return <Pill variant="active">active</Pill>;
  if (status === "warning") return <Pill variant="warning">warning</Pill>;
  return <Pill variant="muted">inactive</Pill>;
}

function formatRM(amount: number) {
  return `RM ${amount.toLocaleString("en-MY")}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-MY");
}

interface CustomerCardProps {
  customer: CustomerJson;

  totalRentals: number;
  totalSpent: number;

  currentRental?: {
    carName: string;
    startDate: string;
    endDate: string;
  } | null;

  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function CustomerCard({
  customer,
  totalRentals,
  totalSpent,
  currentRental,
  onEdit,
  onDelete,
}: CustomerCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="font-semibold">{customer.fullName}</div>
        {statusBadge(customer.status)}
      </div>

      {/* Contact Info */}
      <div className="mt-3 space-y-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Mail size={14} />
          <span>{customer.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={14} />
          <span>{customer.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span>{customer.address}</span>
        </div>
      </div>

      {/* Derived Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-muted p-3 text-center">
          <div className="text-2xl font-semibold">{totalRentals}</div>
          <div className="text-xs text-muted-foreground">Total Rentals</div>
        </div>

        <div className="rounded-lg bg-muted p-3 text-center">
          <div className="text-2xl font-semibold">{formatRM(totalSpent)}</div>
          <div className="text-xs text-muted-foreground">Total Spent</div>
        </div>
      </div>

      {/* Current Rental (derived from rentals.json) */}
      {currentRental ? (
        <div className="mt-4 rounded-lg border border-border bg-secondary p-3">
          <div className="text-sm font-semibold text-secondary-foreground">
            Current Rental
          </div>
          <div className="mt-1 text-sm">{currentRental.carName}</div>
          <div className="text-xs text-muted-foreground">
            {formatDate(currentRental.startDate)} – {formatDate(currentRental.endDate)}
          </div>
        </div>
      ) : null}

      {/* Footer */}
      <div className="mt-3 text-sm text-muted-foreground">
        Member since {formatDate(customer.createdAt)}
      </div>

      {/* Notes */}
      {customer.note ? (
        <div className="mt-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
          {customer.note}
        </div>
      ) : null}

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 text-sm hover:opacity-90"
          onClick={() => onEdit?.(customer.id)}
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-muted px-3 py-2 hover:opacity-90 text-destructive"
          onClick={() => onDelete?.(customer.id)}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
