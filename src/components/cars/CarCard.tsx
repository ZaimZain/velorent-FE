import Pill from "../ui/Pill";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { CarFleetJson } from "../../types/CarFleetType";
import CarEditModal from "./CarEditModal";

/**
 * Small helper: map car status -> pill style
 */
function statusPill(status: CarFleetJson["carStatus"]) {
  switch (status) {
    case "AVAILABLE":
      return <Pill variant="active">available</Pill>;
    case "RENTED":
      return <Pill variant="upcoming">rented</Pill>;
    case "MAINTENANCE":
      return <Pill variant="warning">maintenance</Pill>;
    default:
      return <Pill variant="muted">{status}</Pill>;
  }
}

/**
 * Helper: Get the first valid image URL from the array
 */
function getFirstValidImageUrl(imageUrls: string[]): string | null {
  if (!imageUrls || imageUrls.length === 0) return null;
  const validUrl = imageUrls.find(url => url && url.trim() !== "");
  return validUrl || null;
}

interface CarCardProps {
  car: CarFleetJson;

  // optional callbacks so this component is reusable
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onCarUpdated?: (updatedCar: CarFleetJson) => void;
}

export default function CarCard({ car, onEdit, onDelete, onCarUpdated }: CarCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(car);

  const imageUrl = getFirstValidImageUrl(currentCar.imageUrls);
  const hasValidImage = imageUrl && !imageError;

  const handleCarUpdated = (updatedCar: CarFleetJson) => {
    setCurrentCar(updatedCar);
    onCarUpdated?.(updatedCar);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col h-full">
        {/* Car image - auto height, fits card width, no cropping */}
        <div className="relative w-full bg-muted">
          {hasValidImage ? (
            <img
              src={imageUrl}
              alt={`${currentCar.brand} ${currentCar.model}`}
              className="w-full object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full py-12 flex items-center justify-center text-sm text-muted-foreground">
              No image
            </div>
          )}

          {/* Status badge */}
          <div className="absolute top-3 right-3">{statusPill(currentCar.carStatus)}</div>
        </div>

        {/* Card body - flex-1 to push buttons to bottom */}
        <div className="p-4 flex flex-col flex-1">
          {/* Title */}
          <div>
            <div className="font-semibold">
              {currentCar.year} {currentCar.brand} {currentCar.model}
            </div>
            <div className="text-sm text-muted-foreground">{currentCar.plateNumber}</div>
          </div>

          {/* Car attributes */}
          <div className="mt-4 text-sm grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="text-muted-foreground">Color:</div>
            <div className="text-right">{currentCar.color}</div>

            <div className="text-muted-foreground">Fuel:</div>
            <div className="text-right">{currentCar.fuelType}</div>

            <div className="text-muted-foreground">Daily Rate:</div>
            <div className="text-right font-semibold">RM {currentCar.dailyRate}</div>

            {/* Rented-only fields (these are from your JSON) */}
            {currentCar.carStatus === "RENTED" && currentCar.renterFullName ? (
              <>
                <div className="text-muted-foreground">Renter:</div>
                <div className="text-right">{currentCar.renterFullName}</div>
              </>
            ) : null}
          </div>

          {/* Spacer to push buttons to bottom */}
          <div className="flex-1" />

          {/* Actions - stick to bottom */}
          <div className="mt-4 flex gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 text-sm hover:opacity-90"
              onClick={() => setIsEditModalOpen(true)}
              type="button"
            >
              <Pencil size={16} />
              Edit
            </button>

            <button
              className="rounded-lg border border-border bg-muted px-3 py-2 text-destructive hover:opacity-90"
              onClick={() => onDelete?.(currentCar.carId)}
              type="button"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <CarEditModal
          car={currentCar}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleCarUpdated}
        />
      )}
    </>
  );
}
