import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("customer", (table) => {
    table.string("id").primary();
    table.string("user_id").notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("phone").nullable();
    table.text("address").nullable();
    table
      .enum("status", ["active", "inactive", "suspended"])
      .defaultTo("active");
    table.timestamp("registration_date").defaultTo(knex.fn.now());
    table.integer("total_requests").defaultTo(0);
    table.decimal("rating", 3, 2).nullable();
    table.text("service_keywords").nullable();
    table.boolean("verified").defaultTo(false);

    table.timestamps(true, true);

    table.foreign("user_id").references("id").inTable("user"); // to link to user table
    table.index("user_id");
    table.index("email"); // to search by email
    table.index("status"); // to search by status
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("customer");
}
