const express = require('express');

const router = express.Router();
const queries = require('../db/userQuerys');
const middleware = require('../middlewares/auth');


router.get('/', (req, res) => {
  queries.retrieveAll().then(users => {
    res.json(users)
  })
});

router.get('/:id', middleware.isValid, (req, res, next) => {
  queries.getById(req.params.id).then(user => {
    if (user) {
      res.json(user);
    } else {
      next(new Error('Not Found'));
    }
  });
})

router.post('/', (req, res, next) => {
  console.log(req.body);
  if (middleware.validUser(req.body)) {
    //insert into db
    queries.createUser(req.body).then(user => {
      res.json(user[0]);
    });
  } else {
    next(new Error('Invalid User'))
  }
});

router.put('/:id', middleware.isValid, (req, res, next) => {
  if (middleware.validUser(req.body)) {
    queries.updateUser(req.params.id, req.body).then(users => {
      res.json(users[0]);
    })
  } else {
    next(new Error('Unable to update user'))
  }
});

router.delete('/:id', middleware.isValid, (req, res, next) => {
  queries.deleteUser(req.params.id).then(() => {
    res.json({
      deleted: true,
      deletedID: req.params.id
    });
  });
});

module.exports = router;