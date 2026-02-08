// src/services/rentals.service.ts
import api from "./api";
import { USE_API } from "../services/dataSource";
import rentalsMock from "../mocks/rentals.json";
import { Rental } from "../types/Rental";

/**
 * Normalize rental fields so UI always receives the Rental interface shape.
 * Supports:
 * - Mock camelCase: carId, customerId, startDate, endDate, pickupLocation...
 * - API snake_case: car_id, customer_id, start_date, end_date, pickup_location...
 */
function normalizeRental(raw: any): Rental {
  return {
    id: Number(raw.id),
    car_id: Number(raw.car_id ?? raw.carId),
    customer_id: Number(raw.customer_id ?? raw.customerId),

    start_date: raw.start_date ?? raw.startDate,
    end_date: raw.end_date ?? raw.endDate,

    pickup_location: raw.pickup_location ?? raw.pickupLocation ?? "",
    dropoff_location: raw.dropoff_location ?? raw.dropoffLocation ?? "",

    total_amount: Number(raw.total_amount ?? raw.totalAmount ?? 0),
    paid_amount: Number(raw.paid_amount ?? raw.paidAmount ?? 0),

    // Prefer explicit rental_status/payment_status. Fall back to older "status"/"paymentStatus".
    rental_status: (raw.rental_status ?? raw.status ?? "UPCOMING") as Rental["rental_status"],
    payment_status: (raw.payment_status ?? raw.paymentStatus ?? "UNPAID") as Rental["payment_status"],

    created_at: raw.created_at ?? raw.createdAt ?? new Date().toISOString(),
    updated_at: raw.updated_at ?? raw.updatedAt ?? new Date().toISOString(),
  };
}

/**
 * GET rentals list (for Rental Status + Calendar)
 */
export async function getRentals(): Promise<Rental[]> {
  if (USE_API) {
    // expects GET http://localhost:8080/api/rentals
    const res = await api.get<any[]>("/rentals");
    return res.data.map(normalizeRental);
  }

  return (rentalsMock as any[]).map(normalizeRental);
}

/**
 * GET one rental by id
 */
export async function getRentalById(id: number): Promise<Rental> {
  if (USE_API) {
    const res = await api.get<any>(`/rentals/${id}`);
    return normalizeRental(res.data);
  }

  const found = (rentalsMock as any[]).find((r) => Number(r.id) === id);
  if (!found) throw new Error(`Rental id=${id} not found in rentals mock`);
  return normalizeRental(found);
}

/**
 * CREATE rental
 */
export async function createRental(payload: Partial<Rental>): Promise<Rental> {
  if (USE_API) {
    const res = await api.post<any>("/rentals", payload);
    return normalizeRental(res.data);
  }

  // Mock mode: simulate create
  const now = new Date().toISOString();
  const nextId =
    Math.max(0, ...(rentalsMock as any[]).map((r) => Number(r.id) || 0)) + 1;

  return normalizeRental({
    ...payload,
    id: nextId,
    created_at: now,
    updated_at: now,
  });
}

/**
 * UPDATE rental
 */
export async function updateRental(id: number, payload: Partial<Rental>): Promise<Rental> {
  if (USE_API) {
    const res = await api.put<any>(`/rentals/${id}`, payload);
    return normalizeRental(res.data);
  }

  // Mock mode: simulate update
  const existing = (rentalsMock as any[]).find((r) => Number(r.id) === id);
  if (!existing) throw new Error(`Rental id=${id} not found in rentals mock`);

  return normalizeRental({
    ...existing,
    ...payload,
    updated_at: new Date().toISOString(),
  });
}

/**
 * END rental (business action)
 * - usually: sets rental_status to COMPLETED
 */
export async function endRental(id: number): Promise<Rental> {
  if (USE_API) {
    const res = await api.post<any>(`/rentals/${id}/end`);
    return normalizeRental(res.data);
  }

  return updateRental(id, { rental_status: "COMPLETED" });
}

/**
 * SEND reminder (business action)
 * - backend should handle real notification sending
 */
export async function sendPaymentReminder(id: number): Promise<{ success: boolean }> {
  if (USE_API) {
    const res = await api.post<{ success: boolean }>(`/rentals/${id}/send-reminder`);
    return res.data;
  }

  return { success: true };
}
