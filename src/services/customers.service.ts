// src/services/customers.service.ts
import api from "./api";
import { USE_API } from "./dataSource";
import customersMock from "../mocks/customers.json";
import { CustomerJson } from "../types/CustomerJson";

export async function getCustomers(): Promise<CustomerJson[]> {
  if (USE_API) {
    const res = await api.get<CustomerJson[]>("/customers");
    return res.data;
  }

  return customersMock as CustomerJson[];
}

export async function getCustomerById(id: number): Promise<CustomerJson> {
  if (USE_API) {
    const res = await api.get<CustomerJson>(`/customers/${id}`);
    return res.data;
  }

  const found = (customersMock as CustomerJson[]).find((c) => c.id === id);
  if (!found) throw new Error(`Customer id=${id} not found in customers mock`);
  return found;
}
