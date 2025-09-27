import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE customer CASCADE");

  // Inserts seed entries
  await knex.table("customer").insert([
    {
      id: "CUST-001",
      user_id: "USER-001",
      name: "John Smith",
      email: "john@email.com",
      phone: "+94-77-123-4567",
      address: "123 Main St, Colombo, Western Province 00100, Sri Lanka",
      status: "active",
      registration_date: "2024-01-15T00:00:00Z",
      total_requests: 5,
      rating: 4.8,
      service_keywords: "cleaners,house cleaning",
      verified: true,
    },
  ]);
}
