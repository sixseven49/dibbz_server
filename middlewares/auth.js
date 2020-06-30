const Validator = require('jsonschema').Validator;
var v = new Validator();
var regexUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
var schemas = require('../middlewares/schemas'); // gives me the schemas of the db in json

function isValid(req, res, next) {
  if (regexUUID.test(req.params.id)) {
    return next();
  } else {
    return next(new Error("Invalid uuidV4"));
  }
}

function validUser(user) {
  try {
    // checks if the user object matches the schema
    if (v.validate(user, schemas.userSchema).valid) throw "incorrect json formart"
  } catch (err) {
    return new Error("Missing element");
  }
}

function validRole(role) {
  try {
    if (role.hasOwnProperty('type')) throw "Missing Type"
  } catch (err) {
    return new Error(err)
  }
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', {
    error: err
  })
}


module.exports = {
  isValid,
  validUser,
  validRole,
  errorHandler
}