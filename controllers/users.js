const express = require("express");
const bcrypt = require("bcrypt");
const moment = require("moment");
const router = express.Router();
const queries = require("../db/userQuerys");
const middleware = require("../middlewares/auth");

router.get("/", (req, res) => {
  queries.retrieveAll().then((users) => {
    res.json(users);
  });
});

router.get("/:id", middleware.isValid, (req, res, next) => {
  queries.getById(req.params.id).then((user) => {
    if (user) {
      res.send("User sucessfully created");
      res.json(user);
    } else {
      next(new Error("Not Found"));
    }
  });
});

router.post("/signup", (req, res, next) => {
  if (middleware.validUser(req.body)) {
    req.body.created_at = moment(); // now date
    var hash = bcrypt.hashSync("myPassword", 10); //hash password
    req.body.password = hash;
    //insert into db
    queries.createUser(req.body).then(res => {
      res.json(res)
    }).catch(function (err) {
      res.json({
        message: err.message,
        error: err.toString()
      })
    });
  } else {
    next(new Error("Invalid User Object"));
  }
});

router.put("/:id", middleware.isValid, (req, res, next) => {
  if (middleware.validUser(req.body)) {
    try {
      queries.updateUser(req.params.id, req.body)
    } catch (error) {
      next(new Error("Unable to update user"));
    }
  }
});


router.delete("/:id", middleware.isValid, (req, res, next) => {
  queries.deleteUser(req.params.id).then(() => {
    res.json({
      deleted: true,
      deletedID: req.params.id,
    });
  });
});


module.exports = router;