const express = require('express');

const router = express.Router();
const queries = require('../db/userQuerys');
const middleware = require('../middlewares/auth');

router.post('/login', (req, res, next) => {

});
router.post('/signup', (req, res, next) => {
  req.body.email
});



module.exports = router;