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
    return new Promise((res, rej) => {
      knex('customers').insert(customer, '*').then(customer => {
        if (customer) {
          res(customer);
          return;
        }
        rej({
          message: "unable to create customer"
        });
        return;
      }).catch(err => {
        rej(err);
        return;
      })
    })
  },
  updateCustomer(id, customer) {
    return knex('customers').where('id', id).update(customer, '*');
  },
  deleteCustomer(id, customer) {
    return knex('customers').where('id', id).del();
  }
}