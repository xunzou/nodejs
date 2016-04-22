//暂时没有用了，此js的功能已经用routes.js代替

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('reg', {
		title: 'reg'
	});
});

module.exports = router;