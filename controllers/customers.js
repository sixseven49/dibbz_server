const express = require('express');

const router = express.Router();
const queries = require('../db/customerQuerys');
const middleware = require('../middlewares/auth');


router.get('/', (req, res, next) => {
  queries.retrieveAll().then(customers => {
    try {
      res.json(customers);
    } catch (err) {
      next(new Error('Unable to retireve list' + err));
    }
  })
});

router.get('/:id', middleware.isValid, (req, res, next) => {
  queries.getById(req.params.id).then(customer => {
    if (customer) {
      res.json(customer);
    } else {
      next(new Error('Customer Not Found'));
    }
  });
})

router.post('/', (req, res, next) => {
  console.log(req.body);
  if (middleware.validCustomer(req.body)) {
    //insert into db
    queries.createCustomer(req.body).then(customer => {
      res.json(customer[0]);
    });
  } else {
    next(new Error('Invalid Customer Object'))
  }
});

router.put('/:id', middleware.isValid, (req, res, next) => {
  if (middleware.validCustomer(req.body)) {
    queries.updateCustomer(req.params.id, req.body).then(customers => {
      res.json(customers[0]);
    })
  } else {
    next(new Error('Unable to update customer'))
  }
});

router.delete('/:id', middleware.isValid, (req, res) => {
  queries.deleteCustomer(req.params.id).then(() => {
    res.json({
      deleted: true,
      deletedID: req.params.id
    });
  });
});

module.exports = router;