const express = require('express');
const bcrypt = require('bcrypt');
const moment = require('moment');
const router = express.Router();
const userQuerys = require('../db/userQuerys');
const customerquerys = require('../db/customerQuerys');
const merchantQuerys = require('../db/merchantQuerys');
const middleware = require('../middlewares/auth');
router.post('/login', (req, res, next) => {

});

function createUser(req, res, next) {
  //checks if email already exisits
  if (middleware.validUser(req.body)) {
    //insert into db
    req.body.created_at = moment(); // now date
    var hash = bcrypt.hashSync("myPassword", 10); //hash password
    req.body.password = hash;
    userQuerys.createUser(req.body).then(res => {
      res.locals = res[0];
      console.log("USER: " + res.locals);
      next();
    }).catch(function (error) {
      console.log("meow error");
      res.json({
        message: error.message,
        error: error.toString()
      })
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
  });
}

router.post('/customer/signup', createUser, (req, res, next) => {
  // create customer
  userQuerys.getById(re.locals.id).then(user => {
    console.log(user)
    try {
      if (user.length == 1) {
        var customer = {
          "user_id": req.locals.id,
          "created_at": moment() // now date
        }
        customerquerys.createCustomer(customer).then(customers => {
          res.json(customers[0]);
        }).catch(function (err) {
          deleteUser(res)
          res.json({
            message: err.message
          })
        });
      }
      throw "user doesn't exist"
    } catch (err) {
      deleteUser(res)
      console.log(err);
      res.json({
        message: err.message
      })
    }

  }).catch(function (err) {
    deleteUser(res)
    console.log(err);
    res.json({
      message: "user doesn't exisis"
    })
  });
})

router.post('/merchant/signup', (req, res, next) => {
  // check if user exisits
  userQuerys.getById(req.body.user_id).then(user => {
    // create merchant
    if (user) {
      if (middleware.validMerchant(req.body)) {
        //insert into db
        req.body.created_at = moment(); // now date
        merchantQuerys.createMerchant(req.body).then(merchants => {
          res.json(merchants[0]);
          next();
        }).catch(function (err) {
          console.log(err.stack);
          next();
        });
      }
    } else {
      next(new Error("customer creation error"));
    }
  }).catch(function (err) {
    console.log(err.stack);
    next();
  });

})


module.exports = router;