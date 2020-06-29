const express = require('express');

const router = express.Router();
const queries = require('../db/roleQuerys');
const middleware = require('../middlewares/auth');


router.get('/', (req, res, next) => {
  queries.retrieveAll().then(roles => {
    try {
      res.json(roles);
    } catch (err) {
      next(new Error('Unable to retireve list' + err));
    }
  })
});

router.get('/:id', middleware.isValid, (req, res, next) => {
  queries.getById(req.params.id).then(role => {
    if (role) {
      res.json(role);
    } else {
      next(new Error('Role Not Found'));
    }
  });
})

router.post('/', (req, res, next) => {
  console.log(req.body);
  if (middleware.validRole(req.body)) {
    //insert into db
    queries.createRole(req.body).then(role => {
      res.json(role[0]);
    });
  } else {
    next(new Error('Invalid Role Object'))
  }
});

router.put('/:id', middleware.isValid, (req, res, next) => {
  if (middleware.validRole(req.body)) {
    queries.updateRole(req.params.id, req.body).then(roles => {
      res.json(roles[0]);
    })
  } else {
    next(new Error('Unable to update role'))
  }
});

router.delete('/:id', middleware.isValid, (req, res) => {
  queries.deleteRole(req.params.id).then(() => {
    res.json({
      deleted: true,
      deletedID: req.params.id
    });
  });
});

module.exports = router;