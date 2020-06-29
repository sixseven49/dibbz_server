const express = require('express');

const router = express.Router();
const queries = require('../db/merchantQuerys');
const middleware = require('../middlewares/auth');


router.get('/', (req, res, next) => {
  queries.retrieveAll().then(merchants => {
    try {
      res.json(merchants);
    } catch (err) {
      next(new Error('Unable to retireve list' + err));
    }
  })
});

router.get('/:id', middleware.isValid, (req, res, next) => {
  queries.getById(req.params.id).then(merchant => {
    if (merchant) {
      res.json(merchant);
    } else {
      next(new Error('Merchant Not Found'));
    }
  });
})

router.post('/', (req, res, next) => {
  console.log(req.body);
  if (middleware.validMerchant(req.body)) {
    //insert into db
    queries.createMerchant(req.body).then(merchant => {
      res.json(merchant[0]);
    });
  } else {
    next(new Error('Invalid Merchant Object'))
  }
});

router.put('/:id', middleware.isValid, (req, res, next) => {
  if (middleware.validMerchant(req.body)) {
    queries.updateMerchant(req.params.id, req.body).then(merchants => {
      res.json(merchants[0]);
    })
  } else {
    next(new Error('Unable to update merchant'))
  }
});

router.delete('/:id', middleware.isValid, (req, res) => {
  queries.deleteMerchant(req.params.id).then(() => {
    res.json({
      deleted: true,
      deletedID: req.params.id
    });
  });
});

module.exports = router;