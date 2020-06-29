require('dotenv').config();
exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  return insertRolesData()
    .then(insertUsersData);

  function insertRolesData() {
    return knex('auth_roles').del().then(function () {
      // Inserts seed entries
      return knex("auth_roles").insert([{
          id: '6e9437f6-c766-4619-841e-841313449c1c',
          type: 'Super Admin'
        },
        {
          id: 'ba40e53b-12a8-4632-9b25-5d6e192c9b8e',
          type: 'Customer'
        },
        {
          id: '6e50c484-3ccb-4f12-ba02-99a57fa5429f',
          type: 'Merchant'
        }
      ]);
    });
  }

  function insertUsersData() {
    return knex('users').del().then(function () {
      // Inserts seed entries
      return knex("users").insert([{
        id: '1ac7c5c5-26df-4e33-b562-0193707e39da',
        email: process.env.ADMINEMAIL,
        password: process.env.ADMINPASSWORD,
        first_name: 'Admin',
        role_id: '6e9437f6-c766-4619-841e-841313449c1c',
        locked_out: false
      }]);
    });
  }
};