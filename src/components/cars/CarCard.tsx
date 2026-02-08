import Pill from "../ui/Pill";
import { Pencil, Trash2 } from "lucide-react";
import { CarFleetJson } from "../../types/CarFleetJson";

/**
 * Small helper: map car status -> pill style
 */
function statusPill(status: CarFleetJson["status"]) {
  switch (status) {
    case "available":
      return <Pill variant="active">available</Pill>;
    case "rented":
      return <Pill variant="upcoming">rented</Pill>;
    case "maintenance":
      return <Pill variant="warning">maintenance</Pill>;
    default:
      return <Pill variant="muted">{status}</Pill>;
  }
}

interface CarCardProps {
  car: CarFleetJson;

  // optional callbacks so this component is reusable
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function CarCard({ car, onEdit, onDelete }: CarCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Car image */}
      <div className="relative h-44 bg-muted">
        {car.image ? (
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 right-3">{statusPill(car.status)}</div>
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Title */}
        <div>
          <div className="font-semibold">
            {car.year} {car.make} {car.model}
          </div>
          <div className="text-sm text-muted-foreground">{car.licensePlate}</div>
        </div>

        {/* Car attributes */}
        <div className="mt-4 text-sm grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="text-muted-foreground">Color:</div>
          <div className="text-right">{car.color}</div>

          <div className="text-muted-foreground">Fuel:</div>
          <div className="text-right">{car.fuelType}</div>

          <div className="text-muted-foreground">Daily Rate:</div>
          <div className="text-right font-semibold">RM {car.dailyRate}</div>

          {/* Rented-only fields (these are from your JSON) */}
          {car.status === "rented" && car.currentRenter ? (
            <>
              <div className="text-muted-foreground">Renter:</div>
              <div className="text-right">{car.currentRenter}</div>
            </>
          ) : null}

          {car.status === "rented" && car.dueDate ? (
            <>
              <div className="text-muted-foreground">Due:</div>
              <div className="text-right text-destructive">{car.dueDate}</div>
            </>
          ) : null}
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 text-sm hover:opacity-90"
            onClick={() => onEdit?.(car.id)}
            type="button"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            className="rounded-lg border border-border bg-muted px-3 py-2 text-destructive hover:opacity-90"
            onClick={() => onDelete?.(car.id)}
            type="button"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
