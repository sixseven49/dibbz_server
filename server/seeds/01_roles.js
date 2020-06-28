exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("roles")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("roles").insert([{
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
};