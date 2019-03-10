var express = require('express');
var router = express.Router();

router.get('/register', function (req, res, next) {
  res.render('teacher_register');
});

router.get('/login', function (req, res, next) {
  res.render('teacher_login');
});

router.get('/forget', function (req, res, next) {
  res.render('teacher_forget');
});

module.exports = router;
