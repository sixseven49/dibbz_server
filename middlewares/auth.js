var regexUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isValid(req, res, next) {
  if (regexUUID.test(req.params.id)) {
    return next();
  } else {
    return next(new Error("Invalid uuidV4"));
  }
}

function validUser(user) {
  try {
    if (user.hasOwnProperty('email')) throw "Missing Email";
    if (user.hasOwnProperty('password')) throw "Missing Password";
    if (user.hasOwnProperty('first_name')) throw "Missing first name";
    if (user.hasOwnProperty('role_id')) throw "Missing role";
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