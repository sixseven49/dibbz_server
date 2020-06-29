const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const users = require('./controllers/users');
const roles = require('./controllers/authroles');
const customers = require('./controllers/customers');
const merchants = require('./controllers/merchant');

app.use(logger('dev'));
app.use(express.json());
// this allows us to access the form data through req variable in posts
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

//router file
app.use('/api/v1/users', users);
app.use('/api/v1/roles', roles);
app.use('/api/v1/customers', customers);
app.use('/api/v1/merchants', merchants);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') == 'developement' ? err : {}
  });
});

module.exports = app;