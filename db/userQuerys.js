/**
 * Use this file to make querys
 */
const knex = require("./knex");
module.exports = {
  retrieveAll() {
    return knex('users');
  },
  getById(id) {
    return new Promise((resolve, reject) => {
      knex('users').where('id', id)
        .first()
        .then(user => {
          try {
            if (user) {
              resolve(user);
              return;
            }
            throw "user doens't exisit";
          } catch (err) {
            reject(err);
            return;
          }
        }).catch(function () {
          reject();
          return;
        })
    })
  },
  createUser(user) {
    return new Promise((resolve, reject) => {
      knex('users')
        .select('*')
        .where({
          'email': user.email
        }).then(results => {
          console.log(results);
          try {
            if (results.length == 0) {
              var createdUser = knex('users').insert(user, "*");
              resolve(createdUser);
              return;
            }
            throw "Email already exisits";
          } catch (err) {
            reject(err);
            return;
          }
        })
    })
  },
  updateUser(id, user) {
    return knex('users').where('id', id).update(user, '*');
  },
  deleteUser(id, user) {
    return knex('users').where('id', id).del();
  }
}