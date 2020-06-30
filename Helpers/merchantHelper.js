const express = require('express');

const queries = require('../db/customerQuerys');
const middleware = require('../middlewares/auth');

function createMerchantUser(user_id, req) {
  queries.getById(user_id).then(user => {
    try {
      queries.createMerchant(req.body).then(customer => {
        res.json(customer[0]);
        return "customer created";
      });
    } catch (err) {
      return err.message;
    }
  });
}

module.exports = {
  createMerchantUser
};