
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var db = mysql.createConnection(require('../config').db);

router.post('/register', function (req, res, next) {
	db.query('select * from person where email = "' + req.body.email + '"', function (err, results) {
		if (err) res.send({ status: 'error' })
		else if (results.length > 0) res.send({ status: 'invalid' })
		else {
			db.query('insert into person (name, email, password) values ("' + req.body.nome + '", "' + req.body.email + '", md5("' + req.body.senha + '"))', function (err, results, fields) {
				if (err) res.send({ status: 'error', message: err.message })
				else res.send({ status: 'ok' });
			});
		}
	});
});

router.post('/login', function (req, res, next) {
	db.query('select * from person where email = "' + req.body.email + '" and password = md5("' + req.body.senha + '") ', function (err, results, fields) {
		if (err) res.send({ status: 'error' })
		else if (results.length == 1) {
			req.session.id = results[0].id ;
			res.send({ status: 'ok' });
		}
		else res.send({ status: 'invalid' });
	});
});

router.post('/logout', function (req, res, next) {
	req.session = null;
	res.send({ status: 'ok' });
});

module.exports = router;
