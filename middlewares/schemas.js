var userSchema = {
  "id": "uuid",
  "email": "string",
  "password": "string",
  "first_name": "string",
  "last_name": "string",
  "birthday": "string",
  "phone": "string",
  "role_id": "uuid",
  "locked_out": "boolean",
  "created_at": "timestamp"
};
var customerSchema = {
  "id": "uuid",
  "user_id": "uuid"
};
var merchantSchema = {
  "id": "uuid",
  "user_id": "uuid",
  "name": "string",
  "address_id": "uuid",
  "queue_open": "boolean",
  "settings_id": "uuid",
  "created_at": "timestamp"
};

module.exports = {
  userSchema,
  customerSchema,
  merchantSchema
};