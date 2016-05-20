//文章
var Search = require('../module/search.js');
var moment = require('moment');

//添加页面获取分类
exports.getArticle = function(req, res) {
	var text = req.session.userId,
		search = new Search({
			val:req.body.k
		});
	search.getArticle(function(err, rows) {
		if (err) {
			//console.log(err)
			req.flash('error', '出错了');
			return res.redirect('/'); //返回首页
		};
		if (rows) {
			for (var i = 0; i < rows.length; i++) {
				rows[i].addDate = moment(rows[i].addDate).format('YYYY/MM/DD');
			};
			//console.log(rows)
			res.render('search', {
				title: 'search:' + req.body.k,
				nav: 'index',
				data: rows,
				//success: req.flash('success').toString(),
				//error: req.flash('error').toString(),
				user: req.session.user
			});
			res.end()
		};
	})

};