//文章
var Post = require('../module/post.js');
var moment = require('moment');
var markdown = require( "markdown" ).markdown;

//添加页面获取分类
exports.getCatePost = function(req, res) {
	var userId = req.session.userId,
		post = new Post({
			userId: userId
		});
	post.getCateList(function(err, rows) {
		if (err) {
			//console.log(err)
			//req.flash('error', '出错了');
			return res.redirect('/post'); //返回文章页
		};
		if (rows) {
			//console.log(rows)
			res.render('post', {
				title: 'post',
				nav: 'post',
				cate: rows,
				//success: req.flash('success').toString(),
				//error: req.flash('error').toString(),
				success: 'success',
				error: 'error',
				user: req.session.user
			});
			res.end()
		};
	})

};
//保存文章
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
	//return
	var post = new Post(o)
	post.saveArticle(function(err, rows) {
		if (err) {
			//console.log(err)
			//req.flash('error', '出错了');
			return res.redirect('/post'); //返回编辑页
		};
		if (rows) {
			//console.log(JSON.stringify(rows))
			//req.flash('success', '发表成功!');
			res.redirect('/home'); //返回home
			res.end()
		};
	})
};

//删除文章
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
			//console.log(err)
			allData.error = err
			//return res.end(JSON.stringify(err));
		};
		if (rows) {
			//console.log(rows)
			allData.result = rows
			//return res.end(JSON.stringify(rows));
		};
		//return res.json(allData);
		return res.end(JSON.stringify(allData));
	})
};


//获取文章内容
exports.getSingle = function(req, res) {
	var path = req.params.path;
	//console.log(req.params)
	//console.log(req.params.path)
	var post = new Post({
		click:true,
		path: path
	})
	post.getPost(function(err, rows) {
		//console.log(rows)
		if (err) {
			//console.log(err)
			//req.flash('error', '出错了');
			return res.redirect('/');
			//return res.end(JSON.stringify(err));
		};
		if (rows) {
			rows[0].addDate = moment(rows[0].addDate).format('YYYY/MM/DD HH:MM:SS')
			rows[0].article = markdown.toHTML(rows[0].article)
			res.render('article', {
				title: rows[0].title,
				nav: 'index',
				user: req.session.user,
				post: rows[0]
			});
			res.end()
		};
	})

};
//获取文章内容 编辑区展示
exports.getEditSingle = function(req, res) {
	var path = req.params.path;
	var userId = req.session.userId;
	var post = new Post({
		path: path
	})
	post.getPost(function(err, rows) {
		//console.log(rows)
		if (err) {
			return res.redirect('/p/' + path);
		};
		var myPost = new Post({
				userId: userId
			});
		myPost.getCateList(function(error, data) {
			if (error) {return};
			if (data) {
				cate = data
				if (rows) {
					rows[0].path = path;
					//console.log(rows)
					//console.log(cate)
					rows[0].articleHtml = markdown.toHTML(rows[0].article);
					res.render('editpost', {
						title: '编辑文章',
						nav: 'index',
						user: req.session.user,
						post: rows[0],
						cate: cate,
						//success: req.flash('success').toString(),
						//error: req.flash('error').toString(),
						success: 'success',
						error: 'error',
						user: req.session.user
					});

					res.end()
				};

			};
		})
		
	})
};

//保存编辑的文章
exports.editSingle = function(req, res) {
	var path = req.body.path;
	var postObj = {
		path: path,
		title: req.body.article_title,
		cate: req.body.cate,
		summary: req.body.article_summary,
		article: req.body.article_con,
		userId: req.session.userId
	}
	var post = new Post(postObj)
	post.editPost(function(err, rows) {
		//console.log(rows)
		//console.log(err)
		//console.log(rows)
		if (err) {
			//req.flash('error', '出错了');
			return res.redirect('/p/' + path);
		};
		if (rows) {
			return res.redirect('/p/' + path);
		};
	})

};



//获取文章列表
exports.getPostList = function(req, res) {
	var userId = req.session.userId,
		post = new Post({}),
		o = {
			pageSize:10,
			currentPage:req.params.page
		};
	/*console.log(req.body)
	console.log(req.params.page)
	console.log(req.query)*/
	post.getPostList(o,function(err, data) {
		if (err) {
			//console.log(err)
			//req.flash('error', '出错了');
			return res.redirect('/list/1'); //返回文章页
		};
		if (data) {
			console.log(data.paging)
			res.render('list', {
				title: 'list',
				nav: 'list',
				postList: data.result,
				paging: data.paging,
				//success: req.flash('success').toString(),
				//error: req.flash('error').toString(),
				success: 'success',
				error: 'error',
				user: req.session.user
			});
			res.end()
		};
	})

};