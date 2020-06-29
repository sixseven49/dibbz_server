/**
 * Use this file to make querys
 */
require("dotenv").config();
const knex = require("./knex");
module.exports = {
  retrieveAll() {
    return knex('merchants');
  },
  getById(id) {
    return knex('merchants').where('id', id).first();
  },
  createRole(merchant) {
    return knex('merchants').insert(merchant, '*');
  },
  updateRole(id, merchant) {
    return knex('merchants').where('id', id).update(merchant, '*');
  },
  deleteRole(id, merchant) {
    return knex('merchants').where('id', id).del();
  }
}