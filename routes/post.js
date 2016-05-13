//文章
var Post = require('../module/post.js');

exports.getCatePost = function(req, res) {
	var userId = req.session.userId,
		post = new Post({
			userId: userId
		});
	post.getCate(function(err, data) {
		if (err) {
			//console.log(err)
			req.flash('error', '出错了');
			return res.redirect('/post'); //返回文章页
		};
		if (data) {
			//console.log(data)
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

exports.savePost = function(req, res) {
	var article_title = req.body.article_title,
		article_con = req.body.article_con,
		article_summary = req.body.article_summary,
		cate = req.body.cate,
		userId = req.session.userId,
		o = {
			title: article_title,
			article: article_con,
			summary: article_summary,
			userId: userId,
			cate:cate
		};
	console.log(req.body.cate)
	//return
	var post = new Post(o)
	post.saveArticle(function(err, rows) {
		if (err) {
			//console.log(err)
			req.flash('error', '出错了');
			return res.redirect('/post'); //返回登录页
		};
		if (rows) {
			//console.log(JSON.stringify(rows))
			req.flash('success', '发表成功!');
			res.redirect('/home'); //返回home
		};
	})
};