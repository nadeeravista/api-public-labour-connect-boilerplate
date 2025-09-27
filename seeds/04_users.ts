import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("user").del();

  await knex("user").insert([
    {
      id: "USER-001",
      auth0Id: "auth0|507f1f77bcf86cd799439011",
      email: "john.doe@example.com",
      name: "John Doe",
    },
  ]);
}
