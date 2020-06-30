const express = require('express');
const bcrypt = require('bcrypt');
const moment = require('moment');
const router = express.Router();
const userQuerys = require('../db/userQuerys');
const queries = require('../db/customerQuerys');
const middleware = require('../middlewares/auth');
const customerHelper = require('../Helpers/customerHelper');
router.post('/login', (req, res, next) => {

});

function createUser(req, res, next) {
  if (middleware.validUser(req.body)) {
    //insert into db
    req.body.created_at = moment(); // now date
    var hash = bcrypt.hashSync("myPassword", 10); //hash password
    req.body.password = hash;
    userQuerys.createUser(req.body).then((user) => {
      // res.json(user[0]); return back user object
      res.locals = user[0];
      console.log("USER: " + res.locals);
      next(); // complete middleware
    });
  } else {
    //delete made user
    next(new Error("Invalid User"));
  }
};

function deleteUser(req, res, next) {
  userQuerys.deleteUser(res.locals.id).then(() => {
    res.json({
      deleted: true,
      deletedID: req.params.id,
    });
    next();
  });
}

router.post('/customer/signup', createUser, (req, res, next) => {
  // create customer
  userQuerys.getById(res.locals.id).then(user => {
    if (user) {
      var customer = {
        "user_id": res.locals.id
      }
      queries.createCustomer(customer).then(customer => {
        res.json(customer[0]);
        next();
      }).catch(function (err) {
        deleteUser(res, res)
        console.log(err.stack);
        next();
      })
    } else {
      next(new Error("customer creation error"));
    }
  }).catch(function (err) {
    deleteUser(res, res)
    console.log(err.stack);
    next();
  });
})
router.post('/merchant/signup', createUser, (req, res, next) => {

})


module.exports = router;