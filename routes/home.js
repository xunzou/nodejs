//用户相关
var ArticleList = require('../module/articleList.js');
var moment = require('moment');

exports.getLatestPost = function(req, res) {
	var article = new ArticleList()
	article.getArticle(function(err, rows) {
		var allData = {
			error: null,
			result: null
		}
		//console.log(rows)
		if (err) {
			console.log(err)
			req.flash('error', '出错了');
			allData.error = err
			//return res.end(JSON.stringify(err));
		};
		if (rows) {
			allData.result = rows
			//return res.end(JSON.stringify(data));
		};
		//return res.json(allData);
		return res.end(JSON.stringify(allData));

	})
};


exports.getLatestPostEjs = function(req, res) {
	var article = new ArticleList()
	article.getArticle(function(err, rows) {
		if (err) {
			//console.log(err)
			req.flash('error', '出错了');
			//return res.end(JSON.stringify(err));
		};
		if (rows) {
			for (var i = 0; i < rows.length; i++) {
				rows[i].addDate = moment(rows[i].addDate).format('YYYY/MM/DD');
			};
			//allData.result = data
			//return res.end(JSON.stringify(data));
			res.render('index', {
				title: 'myNodeJS',
				success: req.flash('success').toString(),
				error: req.flash('error').toString(),
				user: req.session.user,
				nav: 'index',
				myPost: rows
			});
			res.status(200).end()
		};
	})

};




exports.getHomePost = function(req, res) {
	var userId = req.session && req.session.userId;
	var article = new ArticleList({
		userId: userId
	})
	article.getArticle(function(err, rows) {
		var allData = {
			error: null,
			result: null
		}
		if (err) {
			//console.log(err)
			req.flash('error', '出错了');
			allData.error = err
			//return res.end(JSON.stringify(err));
		};
		if (rows) {
			allData.result = rows
			//return res.end(JSON.stringify(rows));
		};
		//return res.json(allData);
		return res.end(JSON.stringify(allData));

	})
};