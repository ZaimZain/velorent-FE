import api from "./api";
import { USE_API } from "../services/dataSource";
import customersMock from "../mocks/customers.json";
import { Customer } from "../types/Customer";

/**
 * Normalize customer fields.
 * Supports camelCase mock + snake_case API.
 */
function normalizeCustomer(raw: any): Customer {
  return {
    id: Number(raw.id),
    fullName: raw.fullName ?? raw.full_name,
    email: raw.email,
    phone: raw.phone,
    address: raw.address ?? raw.address_line ?? "",
    status: String(raw.status ?? "ACTIVE").toUpperCase() as Customer["status"],

    // Optional fields if your UI uses them:
    memberSince: raw.memberSince ?? raw.member_since ?? raw.created_at ?? new Date().toISOString(),
    notes: raw.notes ?? raw.remark ?? "",
    created_at: raw.created_at ?? raw.createdAt ?? new Date().toISOString(),
    updated_at: raw.updated_at ?? raw.updatedAt ?? new Date().toISOString(),
  } as Customer;
}

export async function getCustomers(): Promise<Customer[]> {
  if (USE_API) {
    // expects GET http://localhost:8080/api/customers
    const res = await api.get<any[]>("/customers");
    return res.data.map(normalizeCustomer);
  }
  return (customersMock as any[]).map(normalizeCustomer);
}

export async function getCustomerById(id: number): Promise<Customer> {
  if (USE_API) {
    const res = await api.get<any>(`/customers/${id}`);
    return normalizeCustomer(res.data);
  }
  const found = (customersMock as any[]).find((c) => Number(c.id) === id);
  if (!found) throw new Error(`Customer id=${id} not found in customers mock`);
  return normalizeCustomer(found);
}
