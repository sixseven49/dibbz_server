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
  createCustomer(customer) {
    return knex('customers').insert(customer, '*');
  },
  updateCustomer(id, customer) {
    return knex('customers').where('id', id).update(customer, '*');
  },
  deleteCustomer(id, customer) {
    return knex('customers').where('id', id).del();
  }
}