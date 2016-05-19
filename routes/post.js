//文章
var Post = require('../module/post.js');

exports.getCatePost = function(req, res) {
	var userId = req.session.userId,
		post = new Post({
			userId: userId
		});
	post.getCate(function(err, rows) {
		if (err) {
			//console.log(err)
			req.flash('error', '出错了');
			return res.redirect('/post'); //返回文章页
		};
		if (rows) {
			//console.log(rows)
			res.render('post', {
				title: 'post',
				nav: 'post',
				cate: rows,
				success: req.flash('success').toString(),
				error: req.flash('error').toString(),
				user: req.session.user
			});
			res.end()
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
			return res.redirect('/post'); //返回编辑页
		};
		if (rows) {
			//console.log(JSON.stringify(rows))
			req.flash('success', '发表成功!');
			res.redirect('/home'); //返回home
			res.end()
		};
	})
};


exports.delPost = function(req, res) {
	var userId = req.session.userId,
		o = {
			userId: userId
		};
	//return
	var userId = req.session.userId,
		pathObj,
		path;
	for(var k in req.body){
		pathObj = JSON.parse(k)
	}
	path = pathObj.path

	var post = new Post(o)
	post.delPost(path,function(err, rows) {
		var allData = {
			error: null,
			result: null
		}
		if (err) {
			console.log(err)
			allData.error = err
			//return res.end(JSON.stringify(err));
		};
		if (rows) {
			console.log(rows)
			allData.result = rows
			//return res.end(JSON.stringify(rows));
		};
		//return res.json(allData);
		return res.end(JSON.stringify(allData));
	})
};