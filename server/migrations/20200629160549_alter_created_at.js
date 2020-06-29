exports.up = function (knex) {
  return Promise.all([
    knex.schema.alterTable('users', function (t) {
      t.timestamp('created_at', {
        useTz: true
      }).alter();
    }),
    knex.schema.alterTable('customers', function (t) {
      t.timestamp('created_at', {
        useTz: true
      }).alter();
    }),
    knex.schema.alterTable('merchants', function (t) {
      t.timestamp('created_at', {
        useTz: true
      }).alter();
    }),
    knex.schema.alterTable('merchant_settings', function (t) {
      t.timestamp('created_at', {
        useTz: true
      }).alter();
    }),
    knex.schema.alterTable('address', function (t) {
      t.timestamp('created_at', {
        useTz: true
      }).alter();
    }),
    knex.schema.alterTable('venue_queue', function (t) {
      t.timestamp('joined_at', {
        useTz: true
      }).alter();
    }),
    knex.schema.alterTable('venue_tables', function (t) {
      t.timestamp('created_at', {
        useTz: true
      }).alter();
    }),
    knex.schema.alterTable('seated', function (t) {
      t.timestamp('started_at', {
        useTz: true
      }).alter();
    })
  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("users"),
    knex.schema.dropTableIfExists("authLogs"),
    knex.schema.dropTableIfExists("customers"),
    knex.schema.dropTableIfExists("merchants"),
    knex.schema.dropTableIfExists("address"),
    knex.schema.dropTableIfExists("merchant_settings"),
    knex.schema.dropTableIfExists("venue_queue"),
    knex.schema.dropTableIfExists("venue_tables"),
    knex.schema.dropTableIfExists("seated")
  ])
};