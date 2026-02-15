// src/services/rentals.service.ts
import api from "./api";
import { USE_API } from "./dataSource";
import rentalsMock from "../mocks/rentals.json";
import { RentalJson } from "../types/RentalJson";

export async function getRentals(): Promise<RentalJson[]> {
  if (USE_API) {
    const res = await api.get<RentalJson[]>("/rentals");
    return res.data;
  }

  return rentalsMock as RentalJson[];
}

export async function getRentalById(id: number): Promise<RentalJson> {
  if (USE_API) {
    const res = await api.get<RentalJson>(`/rentals/${id}`);
    return res.data;
  }

  const found = (rentalsMock as RentalJson[]).find((r) => r.id === id);
  if (!found) throw new Error(`Rental id=${id} not found in rentals mock`);
  return found;
}

// Optional actions (keep for later backend)
export async function createRental(payload: Partial<RentalJson>): Promise<RentalJson> {
  if (USE_API) {
    const res = await api.post<RentalJson>("/rentals", payload);
    return res.data;
  }

  // mock mode: simulate create (doesn't persist)
  const now = new Date().toISOString();
  const nextId =
    Math.max(0, ...(rentalsMock as RentalJson[]).map((r) => Number(r.id) || 0)) + 1;

  return {
    ...(payload as RentalJson),
    id: nextId,
    createdAt: now,
    updatedAt: now,
  };
}

export async function updateRental(id: number, payload: Partial<RentalJson>): Promise<RentalJson> {
  if (USE_API) {
    const res = await api.put<RentalJson>(`/rentals/${id}`, payload);
    return res.data;
  }

  const existing = (rentalsMock as RentalJson[]).find((r) => r.id === id);
  if (!existing) throw new Error(`Rental id=${id} not found in rentals mock`);

  return {
    ...existing,
    ...payload,
    updatedAt: new Date().toISOString(),
  };
}

export async function endRental(id: number): Promise<RentalJson> {
  if (USE_API) {
    const res = await api.post<RentalJson>(`/rentals/${id}/end`);
    return res.data;
  }

  return updateRental(id, { rentalStatus: "completed" });
}

export async function sendPaymentReminder(id: number): Promise<{ success: boolean }> {
  if (USE_API) {
    const res = await api.post<{ success: boolean }>(`/rentals/${id}/send-reminder`);
    return res.data;
  }

  return { success: true };
}
