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


exports.getLatestPostEjs = function(req, res, next) {
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
			/*res.render('index', {
				title: 'myNodeJS',
				success: req.flash('success').toString(),
				error: req.flash('error').toString(),
				user: req.session.user,
				nav: 'index',
				myPost: rows,
				myRandom: []
			});
			res.status(200).end()*/
			req.latestRows = rows;
			next()
		};
	})

};


exports.getRandomPostEjs = function(req, res) {
	var article = new ArticleList({
		selectSQL:'select id,path,title,addDate from article order by rand() limit 10'
		//如果数据特别多，就用下面的sql语句
		//selectSQL:'SELECT id,title FROM article t1 JOIN (SELECT RAND() * (SELECT MAX(id) FROM article) AS nid) t2 ON t1.id > t2.nid LIMIT 5'
	})

	article.getArticle(function(err, randomRows) {
		if (err) {
			//console.log(err)
			req.flash('error', '出错了');
			//return res.end(JSON.stringify(err));
		};
		if (randomRows) {
			for (var i = 0; i < randomRows.length; i++) {
				randomRows[i].addDate = moment(randomRows[i].addDate).format('YYYY/MM/DD');
			};
			//allData.result = data
			//return res.en d(JSON.stringify(data));
			res.render('index', {
				title: 'myNodeJS',
				success: req.flash('success').toString(),
				error: req.flash('error').toString(),
				user: req.session.user,
				nav: 'index',
				myPost: req.latestRows,
				myRandom: randomRows
			});
			res.end()
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