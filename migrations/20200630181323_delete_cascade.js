exports.up = function (knex) {
  return Promise.all([
    knex.schema.alterTable('users', function (table) {
      table.dropForeign("role_id");

      table
        .foreign("role_id")
        .references("auth_roles.id")
        .onDelete("CASCADE");
    })

  ])
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users")
};