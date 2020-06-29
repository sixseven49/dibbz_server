// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: process.env.DEVPGCLIENT,
    connection: process.env.DEVCONNECTIONURL,
    migrations: {
      tableName: 'migrations'
    }
  },

  test: {
    client: process.env.DEVPGTEST,
    connection: process.env.TESTCONNECTIONURL,
    migrations: {
      tableName: 'migrations'
    }
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};