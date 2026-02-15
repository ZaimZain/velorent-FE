// src/services/cars.service.ts
import api from "./api";
import { USE_API } from "./dataSource";
import carsMock from "../mocks/cars.json";
import { CarFleetJson } from "../types/CarFleetType";

export async function getCars(): Promise<CarFleetJson[]> {
  if (USE_API) {
    // expects GET http://localhost:8080/api/cars (based on your api.ts baseURL)
    const res = await api.get<CarFleetJson[]>("/cars");
    return res.data;
  }

  return carsMock as CarFleetJson[];
}

export async function getCarById(id: number): Promise<CarFleetJson> {
  if (USE_API) {
    const res = await api.get<CarFleetJson>(`/cars/${id}`);
    return res.data;
  }

  const found = (carsMock as CarFleetJson[]).find((c) => c.id === id);
  if (!found) throw new Error(`Car id=${id} not found in cars mock`);
  return found;
}
