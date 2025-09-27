import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("city", (table) => {
    table.string("id").primary();
    table.string("name").notNullable().unique();
    table.string("province").notNullable();
    table.string("district").notNullable();
    table.decimal("latitude", 10, 8).nullable();
    table.decimal("longitude", 11, 8).nullable();
    table.integer("population").nullable();
    table.boolean("is_active").defaultTo(true);

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("city");
}
