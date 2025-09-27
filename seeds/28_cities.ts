import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.table("city").del();

  await knex.table("city").insert([
    {
      id: "CITY-001",
      name: "Colombo",
      province: "Western Province",
      district: "Colombo",
      latitude: 6.9271,
      longitude: 79.8612,
      population: 752993,
      is_active: true,
    },
    {
      id: "CITY-002",
      name: "Kandy",
      province: "Central Province",
      district: "Kandy",
      latitude: 7.2906,
      longitude: 80.6337,
      population: 125400,
      is_active: true,
    },
  ]);
}
