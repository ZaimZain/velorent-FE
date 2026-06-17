import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { CarFleetJson } from "../../types/CarFleetType";
import api from "../../services/api";

interface CarEditModalProps {
  car: CarFleetJson;
  onClose: () => void;
  onSave: (updatedCar: CarFleetJson) => void;
}

export default function CarEditModal({ car, onClose, onSave }: CarEditModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [formData, setFormData] = useState({
    brand: car.brand,
    model: car.model,
    bodyType: car.bodyType,
    color: car.color,
    mileage: car.mileage,
    seat: car.seat,
    year: car.year,
    plateNumber: car.plateNumber,
    dailyRate: car.dailyRate,
    description: car.description,
    fuelType: car.fuelType,
    transmission: car.transmission,
    carStatus: car.carStatus,
    imageUrls: [...car.imageUrls],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "mileage" || name === "seat" || name === "year"
          ? parseInt(value) || 0
          : name === "dailyRate"
            ? parseFloat(value) || 0
            : value,
    }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, newImageUrl.trim()],
      }));
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const submitData = {
        brand: formData.brand,
        model: formData.model,
        bodyType: formData.bodyType,
        color: formData.color,
        mileage: formData.mileage,
        seat: formData.seat,
        year: formData.year,
        plateNumber: formData.plateNumber,
        dailyRate: formData.dailyRate,
        description: formData.description,
        fuelType: formData.fuelType,
        transmission: formData.transmission,
        carStatus: formData.carStatus,
        imageUrls: formData.imageUrls,
      };

      const res = await api.put(`/cars/${car.carId}`, submitData);
      onSave(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update car");
      console.error("Error updating car:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
          <h2 className="text-xl font-semibold">Edit Car: {car.year} {car.brand} {car.model}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Grid for form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                required
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Model
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                required
              />
            </div>

            {/* Body Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Body Type
              </label>
              <input
                type="text"
                name="bodyType"
                value={formData.bodyType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Color
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>

            {/* Mileage */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Mileage (km)
              </label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>

            {/* Seat */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Seats
              </label>
              <input
                type="number"
                name="seat"
                value={formData.seat}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Year
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>

            {/* Plate Number */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Plate Number
              </label>
              <input
                type="text"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>

            {/* Daily Rate */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Daily Rate (RM)
              </label>
              <input
                type="number"
                step="0.01"
                name="dailyRate"
                value={formData.dailyRate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              >
                <option value="PETROL">Petrol</option>
                <option value="DIESEL">Diesel</option>
                <option value="HYBRID">Hybrid</option>
                <option value="ELECTRIC">Electric</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Transmission
              </label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              >
                <option value="AUTOMATIC">Automatic</option>
                <option value="MANUAL">Manual</option>
              </select>
            </div>

            {/* Car Status */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Status
              </label>
              <select
                name="carStatus"
                value={formData.carStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              >
                <option value="AVAILABLE">Available</option>
                <option value="RENTED">Rented</option>
                <option value="MAINTENANCE">Maintenance</option>
              </select>
            </div>
          </div>

          {/* Image Management Section */}
          <div className="border-t border-border pt-4 mt-4">
            <h3 className="font-semibold text-foreground mb-3">Manage Images</h3>

            {/* Current Images */}
            {formData.imageUrls.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Current Images ({formData.imageUrls.length})
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {formData.imageUrls.map((url, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 p-2 bg-muted rounded-lg">
                      <div className="flex-1 truncate">
                        <p className="text-sm text-foreground truncate">{url}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-1 text-destructive hover:bg-destructive/10 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Image */}
            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Enter image URL..."
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none text-sm"
                onKeyPress={(e) => e.key === "Enter" && handleAddImage()}
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 flex items-center gap-2 text-sm"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
            />
          </div>

          {/* Footer with buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

