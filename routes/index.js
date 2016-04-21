var express = require('express');
var mysql = require('../conn/conn.js')
var router = express.Router();




console.log(mysql)

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

module.exports = router;