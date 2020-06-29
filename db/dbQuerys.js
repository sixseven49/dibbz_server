/**
 * Use this file to make querys
 */
const knex = require("./knex");

module.exports = {
  retrieveAll() {
    return knex('users');
  },
  getById(id) {
    return knex('users').where('id', id).first();
  },
  createUser(user) {
    return knex('users').insert(user, '*');
  },
  updateUser(id, user) {
    return knex('users').where('id', id).update(user, '*');
  },
  deleteUser(id, user) {
    return knex('users').where('id', id).del();
  }
}