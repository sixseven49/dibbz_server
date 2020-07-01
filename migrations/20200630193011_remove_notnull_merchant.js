exports.up = function (knex) {
  return Promise.all([
    knex.schema.alterTable('merchants', function (table) {
      table.uuid("address_id").nullable().alter();
      table.uuid("settings_id").nullable().alter();
    })
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("merchants")
  ])
};