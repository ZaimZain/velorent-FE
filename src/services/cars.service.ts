import api from "./api";
import { USE_API } from "../services/dataSource";
import carsMock from "../mocks/cars.json";
import { Car } from "../types/Car";

/**
 * Normalize car fields so your UI always gets the Car interface shape.
 * Supports:
 * - JSON camelCase: licensePlate, fuelType, dailyRate, image
 * - API snake_case: license_plate, fuel_type, daily_rate, image_url
 */
function normalizeCar(raw: any): Car {
  const statusRaw = raw.status ?? raw.rental_status ?? "AVAILABLE";

  return {
    id: Number(raw.id),
    make: raw.make,
    model: raw.model,
    year: Number(raw.year),
    license_plate: raw.license_plate ?? raw.licensePlate,
    status: String(statusRaw).toUpperCase() as Car["status"],
    color: raw.color,
    fuel_type: raw.fuel_type ?? raw.fuelType,
    daily_rate: Number(raw.daily_rate ?? raw.dailyRate ?? 0),
    image_url: raw.image_url ?? raw.imageUrl ?? raw.image,
    created_at: raw.created_at ?? raw.createdAt ?? new Date().toISOString(),
    updated_at: raw.updated_at ?? raw.updatedAt ?? new Date().toISOString(),
  };
}

export async function getCars(): Promise<Car[]> {
  if (USE_API) {
    // expects GET http://localhost:8080/api/cars
    const res = await api.get<any[]>("/cars");
    return res.data.map(normalizeCar);
  }
  return (carsMock as any[]).map(normalizeCar);
}

export async function getCarById(id: number): Promise<Car> {
  if (USE_API) {
    const res = await api.get<any>(`/cars/${id}`);
    return normalizeCar(res.data);
  }
  const found = (carsMock as any[]).find((c) => Number(c.id) === id);
  if (!found) throw new Error(`Car id=${id} not found in cars mock`);
  return normalizeCar(found);
}
