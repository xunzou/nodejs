//单文章
var Single = require('../module/Single.js');
var Post = require('../module/post.js');
var moment = require('moment');

exports.getSingle = function(req, res) {
	var path = req.params.path;
	var single = new Single({
		click:true,
		path: path
	})
	single.getPost(function(err, rows) {
		//console.log(rows)
		if (err) {
			//console.log(err)
			req.flash('error', '出错了');
			return res.redirect('/');
			//return res.end(JSON.stringify(err));
		};
		if (rows) {
			rows[0].addDate = moment(rows[0].addDate).format('YYYY/MM/DD HH:MM:SS')
			/*console.log(rows)
			console.log(rows[0])
			console.log(rows instanceof Array)
			console.log(rows[0] instanceof Array)
			console.log('()')
			console.log('{}')
			console.log('[]')*/
			res.render('article', {
				//"layout":"article.html",
				title: rows[0].title,
				nav: 'index',
				user: req.session.user,
				post: rows[0]
			});

			res.end()
		};
	})

};

exports.getEditSingle = function(req, res) {
	var path = req.params.path;
	var userId = req.session.userId;
	var single = new Single({
		path: path
	})
	single.getPost(function(err, rows) {
		//console.log(rows)
		if (err) {
			//console.log(err)
			//req.flash('error', '出错了');
			return res.redirect('/p/' + path);
			//return res.end(JSON.stringify(err));
		};
		var cate = [],
			post = new Post({
				userId: userId
			});
		post.getCate(function(err, data) {
			if (err) {return};
			if (data) {
				cate = data
			};
		})

		if (rows) {
			rows[0].path = path;
			//console.log(rows)
			console.log(cate)
			res.render('editpost', {
				title: '编辑文章',
				nav: 'index',
				user: req.session.user,
				post: rows[0],
				cate: cate,
				success: req.flash('success').toString(),
				error: req.flash('error').toString(),
				user: req.session.user
			});

			res.end()
		};
	})
};

exports.editSingle = function(req, res) {
	var path = req.body.path;
	var postObj = {
		path: path,
		title: req.body.article_title,
		article: req.body.article_con,
		summary: req.body.article_summary,
		cate: req.body.cate,
		userId: req.session.userId,
	}
	console.log(postObj)
	var single = new Single()
	single.editPost(postObj, function(err, rows) {
		//console.log(rows)
		if (err) {
			//console.log(err,104)
			req.flash('error', '出错了');
			return res.redirect('/p/' + path);
			//return res.end(JSON.stringify(err));
		};
		if (rows) {
			//console.log(rows,110)
			return res.redirect('/p/' + path);
		};
	})

};