exports.up = function (knex) {
  return Promise.all([
    knex.schema.alterTable('authLogs', function (table) {
      table.dropForeign("user_id");

      table
        .foreign("user_id")
        .references("users.id")
        .onDelete("CASCADE");
    }),
    knex.schema.alterTable('customers', function (table) {
      table.dropForeign("user_id");

      table
        .foreign("user_id")
        .references("users.id")
        .onDelete("CASCADE");
    }),
    knex.schema.alterTable('merchants', function (table) {
      table.dropForeign("user_id");

      table
        .foreign("user_id")
        .references("users.id")
        .onDelete("CASCADE");
    }),
    knex.schema.alterTable('venue_queue', function (table) {
      table.dropForeign("customer_id");
      table.dropForeign("merchant_id");

      table
        .foreign("customer_id")
        .references("customers.id")
        .onDelete("CASCADE");
      table
        .foreign("merchant_id")
        .references("merchants.id")
        .onDelete("CASCADE");
    }),
    knex.schema.alterTable('seated', function (table) {
      table.dropForeign("customer_id");
      table.dropForeign("merchant_id");
      table.dropForeign("table_id");

      table
        .foreign("customer_id")
        .references("customers.id")
        .onDelete("CASCADE");
      table
        .foreign("merchant_id")
        .references("merchants.id")
        .onDelete("CASCADE");
      table
        .foreign("table_id")
        .references("venue_tables.id")
        .onDelete("CASCADE");
    })

  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("authLogs"),
    knex.schema.dropTableIfExists("customers"),
    knex.schema.dropTableIfExists("merchants"),
    knex.schema.dropTableIfExists("venue_queue"),
    knex.schema.dropTableIfExists("seated")
  ])
};