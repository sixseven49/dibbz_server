exports.up = function (knex) {
  return Promise.all([
    knex.schema.renameTable('authRoles', 'auth_roles')
  ]);
};

exports.down = function (knex) {
  return knex.schema.dropTable('auth_roles');
};