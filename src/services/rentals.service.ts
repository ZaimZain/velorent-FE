// src/services/rentals.service.ts
import api from "./api";
import { Rental } from "../types/Rental";

// ✅ Your mock JSON should live here
// Example path: src/mocks/rentals.json
import rentalsMock from "../mocks/rentals.json";

/**
 * Toggle your data source here.
 * - false = use mock JSON (fast UI development)
 * - true  = use backend API (DB-ready)
 */
const USE_API = false;

/**
 * If your backend returns snake_case fields but frontend uses the Rental interface,
 * normalize here. If your API already returns exact fields, you can simplify/remove.
 */
function normalizeRental(raw: any): Rental {
  // Supports both snake_case and camelCase inputs
  return {
    id: raw.id,
    car_id: raw.car_id ?? raw.carId,
    customer_id: raw.customer_id ?? raw.customerId,

    start_date: raw.start_date ?? raw.startDate,
    end_date: raw.end_date ?? raw.endDate,

    pickup_location: raw.pickup_location ?? raw.pickupLocation ?? "",
    dropoff_location: raw.dropoff_location ?? raw.dropoffLocation ?? "",

    total_amount: raw.total_amount ?? raw.totalAmount ?? 0,
    paid_amount: raw.paid_amount ?? raw.paidAmount ?? 0,

    // rental_status & payment_status are what we want moving forward
    rental_status: raw.rental_status ?? raw.status ?? "UPCOMING",
    payment_status: raw.payment_status ?? raw.paymentStatus ?? "UNPAID",

    created_at: raw.created_at ?? raw.createdAt ?? new Date().toISOString(),
    updated_at: raw.updated_at ?? raw.updatedAt ?? new Date().toISOString(),
  };
}

/**
 * GET rentals list (for Rental Status + Calendar)
 */
export async function getRentals(): Promise<Rental[]> {
  if (USE_API) {
    // Backend endpoint (adjust if your server uses /API uppercase)
    // e.g. http://localhost:8080/api/rentals
    const res = await api.get<any[]>("/rentals");
    return res.data.map(normalizeRental);
  }

  // Mock JSON fallback
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

  const found = (rentalsMock as any[]).find((r) => r.id === id);
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

  const created = normalizeRental({
    ...payload,
    id: nextId,
    created_at: now,
    updated_at: now,
  });

  return created;
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
  const existing = (rentalsMock as any[]).find((r) => r.id === id);
  if (!existing) throw new Error(`Rental id=${id} not found in rentals mock`);

  const updated = normalizeRental({
    ...existing,
    ...payload,
    updated_at: new Date().toISOString(),
  });

  return updated;
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

  // Mock mode: always succeed
  return { success: true };
}
