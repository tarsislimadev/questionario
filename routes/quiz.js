var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('quiz');
});

router.get('/create', function (req, res, next) {
  res.render('quiz_create');
});

router.get('/answers', function (req, res, next) {
  res.render('quiz_answers');
});

module.exports = router;
