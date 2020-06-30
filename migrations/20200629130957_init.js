exports.up = function (knex) {
  return Promise.all([
    knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'),

    knex.schema.createTable("authRoles", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("type").notNullable();
    }),

    knex.schema.createTable("users", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.string("first_name").notNullable();
      table.string("last_name");
      table.date("birthday");
      table.string("phone");
      table.uuid("role_id").unsigned().notNullable();
      table.boolean("locked_out").notNullable().defaultTo(false);
      table.timestamp("created_at");

      table.foreign("role_id").references("authRoles.id");
    }),

    knex.schema.createTable("authLogs", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("user_id").unsigned().notNullable();
      table.timestamp("created_at");
      table.string("log").notNullable();

      table.foreign("user_id").references("users.id");
    }),

    knex.schema.createTable("customers", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("user_id").unsigned().notNullable();
      table.timestamp("created_at");

      table.foreign("user_id").references("id").inTable("users");
    }),

    knex.schema.createTable("merchants", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("user_id").unsigned().notNullable();
      table.string("name");
      table.uuid("address_id").unsigned().notNullable();
      table.boolean("queue_open").notNullable().defaultTo(false);
      table.uuid("settings_id").unsigned().notNullable();
      table.timestamp("created_at");

      table.foreign("user_id").references("id").inTable("users");
      table.foreign("address_id").references("id").inTable("address");
      table
        .foreign("settings_id")
        .references("id")
        .inTable("merchant_settings")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    }),

    knex.schema.createTable("merchant_settings", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.integer("confirm_duration");
      table.integer("stay_duration");
      table.integer("queue_capacity");
      table.integer("bar_capacity");
      table.timestamp("created_at");
      table.timestamp("updated_at");
    }),

    knex.schema.createTable("address", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("line_1");
      table.string("line_2");
      table.string("city");
      table.string("country");
      table.string("postcode");
      table.float("latitude");
      table.float("longitude");
      table.timestamp("created_at");
    }),

    knex.schema.createTable("venue_queue", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("customer_id").unsigned().notNullable();
      table.uuid("merchant_id").unsigned().notNullable();
      table.timestamp("joined_at");

      table.foreign("customer_id").references("id").inTable("customers");
      table.foreign("merchant_id").references("id").inTable("merchants");
    }),

    knex.schema.createTable("venue_tables", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("merchant_id").unsigned().notNullable();
      table.integer("num_sesats");
      table.boolean("available").notNullable().defaultTo(false);
      table.timestamp("created_at");

      table
        .foreign("merchant_id")
        .references("id")
        .inTable("merchants")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    }),

    knex.schema.createTable("seated", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("customer_id").unsigned().notNullable();
      table.uuid("merchant_id").unsigned().notNullable();
      table.uuid("table_id").unsigned().notNullable();
      table.timestamp("started_at");
      table.timestamp("ended_at");

      table.foreign("customer_id").references("id").inTable("customers");
      table.foreign("merchant_id").references("id").inTable("merchants");
      table.foreign("table_id").references("id").inTable("venue_tables");
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("authRoles"),
    knex.schema.dropTableIfExists("users"),
    knex.schema.dropTableIfExists("authLogs"),
    knex.schema.dropTableIfExists("customers"),
    knex.schema.dropTableIfExists("merchants"),
    knex.schema.dropTableIfExists("address"),
    knex.schema.dropTableIfExists("merchant_settings"),
    knex.schema.dropTableIfExists("venue_queue"),
    knex.schema.dropTableIfExists("venue_tables"),
    knex.schema.dropTableIfExists("seated"),
  ]);
};