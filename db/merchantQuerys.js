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
  createMerchant(merchant) {
    return knex('merchants').insert(merchant, '*');
  },
  updateMerchant(id, merchant) {
    return knex('merchants').where('id', id).update(merchant, '*');
  },
  deleteMerchant(id, merchant) {
    return knex('merchants').where('id', id).del();
  }
}