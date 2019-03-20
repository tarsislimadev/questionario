var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('login');
});

router.get('/register', function (req, res, next) {
  res.render('register');
});

router.get('/forget', function (req, res, next) {
  res.render('login_forget');
});

module.exports = router;
