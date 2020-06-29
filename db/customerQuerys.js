/**
 * Use this file to make querys
 */
require("dotenv").config();
const knex = require("./knex");
module.exports = {
  retrieveAll() {
    return knex('customers');
  },
  getById(id) {
    return knex('customers').where('id', id).first();
  },
  createRole(customer) {
    return knex('customers').insert(customer, '*');
  },
  updateRole(id, customer) {
    return knex('customers').where('id', id).update(customer, '*');
  },
  deleteRole(id, customer) {
    return knex('customers').where('id', id).del();
  }
}