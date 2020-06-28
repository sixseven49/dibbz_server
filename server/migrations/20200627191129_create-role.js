exports.up = function (knex) {
  return knex.schema.createTable('roles', (table) => {
    table.uuid('id');
    table.text('type');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('roles');
};