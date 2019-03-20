var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log('id: ' + req.session.id);
  res.render('dashboard',  { id : req.session.id });
});

module.exports = router;
