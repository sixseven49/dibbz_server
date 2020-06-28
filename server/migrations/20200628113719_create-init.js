// Roles Table
exports.up = async function (knex, Promise) {
  return addExtension()
    .then(createRolesTable)
    .then(createUserTable)
    .then(createLogsTable)
    .then(createCustomerTable)
    .then(createSettingsTable)
    .then(createAddressTable)
    .then(createMerchantsTable)
    .then(createQueueTable)
    .then(createTablesTable)
    .then(createSeatedTable);

  function addExtension() {
    return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  }

  function createRolesTable() {
    return knex.schema.createTable("roles", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("type").notNullable();
    });
  }

  function createUserTable() {
    return knex.schema.createTable("users", function (table) {
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

      table
        .foreign("role_id")
        .references("id")
        .inTable("roles");
    });
  }

  function createLogsTable() {
    return knex.schema.createTable("authLogs", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("user_id").unsigned().notNullable();
      table.timestamp("created_at");
      table.string("log").notNullable();

      table
        .foreign("user_id")
        .references("id")
        .inTable("users");
    });
  }

  function createCustomerTable() {
    return knex.schema.createTable("customers", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("user_id").unsigned().notNullable();
      table.timestamp("created_at");

      table.foreign("user_id").references("id").inTable("users");
    });
  }

  function createMerchantsTable() {
    return knex.schema.createTable("merchants", function (table) {
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
        .inTable("merchant_settings");
    });
  }

  function createSettingsTable() {
    return knex.schema.createTable("merchant_settings", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.integer("confirm_duration");
      table.integer("stay_duration");
      table.integer("queue_capacity");
      table.integer("bar_capacity");
      table.timestamp("created_at");
      table.timestamp("updated_at");
    });
  }

  function createAddressTable() {
    return knex.schema.createTable("address", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("line_1");
      table.string("line_2");
      table.string("city");
      table.string("country");
      table.string("postcode");
      table.float("latitude");
      table.float("longitude");
      table.timestamp("created_at");
    });
  }

  function createQueueTable() {
    return knex.schema.createTable("venue_queue", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("customer_id").unsigned().notNullable();
      table.uuid("merchant_id").unsigned().notNullable();
      table.timestamp("joined_at");

      table.foreign("customer_id").references("id").inTable("customers");
      table.foreign("merchant_id").references("id").inTable("merchants");
    });
  }

  function createTablesTable() {
    return knex.schema.createTable("venue_tables", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("merchant_id").unsigned().notNullable();
      table.integer("num_sesats");
      table.boolean("available").notNullable().defaultTo(false);
      table.timestamp("created_at");

      table.foreign("merchant_id").references("id").inTable("merchants");
    });
  }

  function createSeatedTable() {
    return knex.schema.createTable("seated", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("customer_id").unsigned().notNullable();
      table.uuid("merchant_id").unsigned().notNullable();
      table.uuid("table_id").unsigned().notNullable();
      table.timestamp("started_at");
      table.timestamp("ended_at");

      table.foreign("customer_id").references("id").inTable("customers");
      table.foreign("merchant_id").references("id").inTable("merchants");
      table.foreign("table_id").references("id").inTable("venue_tables");
    });
  }
};

exports.down = function (knex, Promise) {
  return dropRoles()
    .then(dropUsers)
    .then(dropAuthLogs)
    .then(dropCustomers)
    .then(dropMerchant)
    .then(dropAddress)
    .then(dropSettings)
    .then(dropQueue)
    .then(dropTables)
    .then(dropSeated);

  function dropRoles() {
    return knex.schema.dropTable("roles");
  }

  function dropUsers() {
    return knex.schema.dropTable("users");
  }

  function dropAuthLogs() {
    return knex.schema.dropTable("authLogs");
  }

  function dropCustomers() {
    return knex.schema.dropTable("customers");
  }

  function dropMerchant() {
    return knex.schema.dropTable("merchants");
  }

  function dropAddress() {
    return knex.schema.dropTable("address");
  }

  function dropSettings() {
    return knex.schema.dropTable("merchant_settings");
  }

  function dropQueue() {
    return knex.schema.dropTable("venue_queue");
  }

  function dropTables() {
    return knex.schema.dropTable("venue_tables");
  }

  function dropSeated() {
    return knex.schema.dropTable("seated");
  }
};