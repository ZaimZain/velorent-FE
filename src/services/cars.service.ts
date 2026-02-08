import api from "./api";
import { USE_API } from "../config/dataSource";
import carsMock from "../mocks/cars.json";
import { Car } from "../types/Car";

function normalizeCar(raw: any): Car {
  return {
    id: raw.id,
    make: raw.make,
    model: raw.model,
    year: raw.year,
    license_plate: raw.license_plate ?? raw.licensePlate,
    status: (raw.status ?? "AVAILABLE").toUpperCase(),
    color: raw.color,
    fuel_type: raw.fuel_type ?? raw.fuelType,
    daily_rate: raw.daily_rate ?? raw.dailyRate,
    image_url: raw.image_url ?? raw.imageUrl ?? raw.image,
    created_at: raw.created_at ?? new Date().toISOString(),
    updated_at: raw.updated_at ?? new Date().toISOString(),
  };
}

export async function getCars(): Promise<Car[]> {
  if (USE_API) {
    const res = await api.get<any[]>("/cars");
    return res.data.map(normalizeCar);
  }
  return (carsMock as any[]).map(normalizeCar);
}
