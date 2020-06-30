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

module.exports = {
  userSchema,
  customerSchema
};