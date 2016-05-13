//用户相关
var ArticleList = require('../module/articleList.js');

exports.getHomePost = function(req, res) {
	var userId = req.session.userId,
		post = new Post({
			userId: userId
		});
	post.getCate(function(err, data) {
		if (err) {
			console.log(err)
			req.flash('error', '出错了');
			return res.redirect('/post'); //返回文章页
		};
		if (data) {
			console.log(data)
			res.render('post', {
				title: 'post',
				cate: data,
				success: req.flash('success').toString(),
				error: req.flash('error').toString(),
				user: req.session.user
			});
		};
	})

};

exports.getLatestPost = function(req, res) {
	var article = new ArticleList()
	article.getArticle(function(err, rows) {
		var allData = {
			error: null,
			result: null
		}
		console.log(rows)
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
	article.getArticle(function(err, data) {
		if (err) {
			//console.log(err)
			req.flash('error', '出错了');
			//allData.error = err
			//return res.end(JSON.stringify(err));
		};
		if (data) {
			//allData.result = data
			//return res.end(JSON.stringify(data));
			res.render('index', {
				title: 'myNodeJS',
				success: req.flash('success').toString(),
				error: req.flash('error').toString(),
				user: req.session.user,
				myPost: data
			});
		};
	})

};