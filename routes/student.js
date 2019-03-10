var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('student_login');
});

module.exports = router;
