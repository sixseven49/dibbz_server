exports.up = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.dropForeign("role_id");

    table
      .foreign("role_id")
      .references("roles.id")
      .onDelete("CASCADE").onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};