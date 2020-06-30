const express = require('express');

const queries = require('../db/customerQuerys');
const middleware = require('../middlewares/auth');

function createCustomerUser(user_id, req) {
  queries.getById(user_id).then(user => {
    try {
      queries.createCustomer(req.body).then(customer => {
        res.json(customer[0]);
        return "customer created";
      });
    } catch (err) {
      return err.message;
    }
  });
}

module.exports = {
  createCustomerUser
};