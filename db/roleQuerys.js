/**
 * Use this file to make querys
 */
require("dotenv").config();
const knex = require("./knex");
module.exports = {
  retrieveAll() {
    return knex('auth_roles');
  },
  getById(id) {
    return knex('auth_roles').where('id', id).first();
  },
  createRole(role) {
    return knex('auth_roles').insert(role, '*');
  },
  updateRole(id, role) {
    return knex('auth_roles').where('id', id).update(role, '*');
  },
  deleteRole(id, role) {
    return knex('auth_roles').where('id', id).del();
  }
}