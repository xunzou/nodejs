//router
var md5 = require("../module/util/md5");
var Reg = require('../module/reg.js');
var Post = require('../module/post.js');
var ArticleList = require('../module/articleList.js');
var Single = require('../module/Single.js');


module.exports = function(app) {

	function checkLogin(req, res, next) {
		if (!req.session.user) {
			req.flash('error', '未登录!');
			return res.redirect('/login');
		}
		next();
	}

	function checkNotLogin(req, res, next) {
		if (req.session.user) {
			req.flash('error', '已登录!');
			return res.redirect('back'); //返回之前的页面
		}
		next();
	}

	/* GET 404 page. */
	app.get('/404', function(req, res) {
		res.render('error', {
			title: '404',
			message: "404",
			status: '404'
		});
	});

	/* GET home page. */
	app.get('/', function(req, res) {
		res.render('index', {
			title: 'myNodeJS',
			success: req.flash('success').toString(),
			error: req.flash('error').toString(),
			user: req.session.user
		});
	});

	//get home article
	app.post('/getAllArticle.json', function(req, res) {
		var article = new ArticleList()
		article.getArticle(function(err, data) {
			var allData = {
				error: null,
				result: null
			}
			console.log(data)
			if (err) {
				console.log(err)
				req.flash('error', '出错了');
				allData.error = err
					//return res.end(JSON.stringify(err));
			};
			if (data) {
				allData.result = data
					//return res.end(JSON.stringify(data));
			};
			//return res.json(allData);
			return res.end(JSON.stringify(allData));

		})
	});
	app.post('/getArticle.json', function(req, res) {
		var article = new ArticleList()
		article.getPost(function(err, data) {
			var allData = {
				error: null,
				result: null
			}
			console.log(data)
			if (err) {
				console.log(err)
				req.flash('error', '出错了');
				allData.error = err
					//return res.end(JSON.stringify(err));
			};
			if (data) {
				allData.result = data
					//return res.end(JSON.stringify(data));
			};
			//return res.json(allData);
			return res.end(JSON.stringify(allData));

		})
	});


	app.get('/reg', checkNotLogin)
	app.get('/reg', function(req, res) {
		res.render('reg', {
			title: '注册',
			success: req.flash('success').toString(),
			error: req.flash('error').toString(),
			user: req.session.user
		});

	});
	app.post('/reg', checkNotLogin)
	app.post('/reg', function(req, res) {
		var name = req.body.name,
			password = req.body.password,
			email = req.body.email;
		var reg = new Reg({
			name: name,
			password: password,
			email: email
		})
		if (!name) {
			req.flash('error', '用户名不能为空');
			return res.redirect('/reg'); //返回注册页
		};
		if (!email) {
			req.flash('error', '邮箱不能为空');
			return res.redirect('/reg'); //返回注册页
		};
		if (!password) {
			req.flash('error', '密码不能为空');
			return res.redirect('/reg'); //返回注册页
		};
		console.log(name, password, email)
		reg.getUser(name, function(err, user) {
			console.log(err, user, 555888)
			if (user.length) {
				console.log('用户已存在!')
				req.flash('error', '用户已存在');
				return res.redirect('/reg'); //返回注册页
			};
			reg.saveUser(function(err, user) {
				if (err) {
					console.log(err)
					req.flash('error', err);
					return res.redirect('/reg'); //返回注册页
				};
				req.session.user = user.name; //用户信息存入 session
				req.session.userId = user.id; //用户id存入 session
				req.flash('success', '注册成功!');
				console.log(user)
				res.redirect('/home'); //返回home
			})

		})
	})

	app.get('/login', checkNotLogin)
	app.get('/login', function(req, res) {
		res.render('login', {
			title: 'login',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	app.post('/login', checkNotLogin)
	app.post('/login', function(req, res) {
		var name = req.body.name,
			password = req.body.password,
			o = {
				name: name,
				password: password
			};
		var reg = new Reg(o)
		reg.getUser(name, function(err, data) {
			/*console.log(o)
			console.log(err, 1111)
			console.log(data, 2222)*/
			if (!data.length) {
				req.flash('error', '暂无此人');
				console.log('暂无此人')
				return res.redirect('/login'); //返回登录页
			};
			if (md5(password) != data[0].password) {
				console.log('密码不对哦！')
				req.flash('error', '密码不对哦！');
				return res.redirect('/login'); //返回登录页
			};
			if (data.length) {
				var userId = data[0].id;
				console.log('登录成功')
				console.log(JSON.stringify(data))
				//更新登录时间信息
				reg.updateInfo(userId,function(err,data){})

				req.session.user = data[0].name; //用户信息存入 session
				req.session.userId = userId; //用户id存入 session
				//console.log(data[0].name)
				//console.log(data[0].id)
				//console.log(req.session.user)
				req.flash('success', '登录成功!');
				res.redirect('/home'); //返回home
			};
		})
	});

	// define the home page route
	app.get('/home', checkLogin)
	app.get('/home', function(req, res) {
		res.render('home', {
			title: 'home',
			success: req.flash('success').toString(),
			error: req.flash('error').toString(),
			user: req.session.user
		});
	});
	app.post('/home/getArticle.json', function(req, res) {
		var userId = req.session && req.session.userId;
		var article = new ArticleList({
				userId: userId
			})
			/*console.log(res)*/
		/*console.log(req.body)
		var params;
		for (var key in req.body) {
			params = JSON.parse(key)
		};
		console.log(typeof params)
		console.log(params)*/
		article.getArticle(function(err, data) {
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
			if (data) {
				allData.result = data
					//return res.end(JSON.stringify(data));
			};
			//return res.json(allData);
			return res.end(JSON.stringify(allData));

		})
	});



	app.get('/logout', function(req, res) {
		req.session.user = null
		res.redirect('/');
	});



	// define the post page route
	app.get('/post', checkLogin)
	app.get('/post', function(req, res) {
		var userId = req.session.userId,
			post = new Post({userId:userId});
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
		
	});
	app.post('/post', checkLogin)
	app.post('/post', function(req, res) {
		var article_title = req.body.article_title,
			article_con = req.body.article_con,
			article_summary = req.body.article_summary,
			userId = req.session.userId,
			o = {
				title: article_title,
				article: article_con,
				summary: article_summary,
				userId: userId
			};
		//return
		var post = new Post(o)
		post.saveArticle(function(err, data) {
			if (err) {
				console.log(err)
				req.flash('error', '出错了');
				return res.redirect('/post'); //返回登录页
			};
			if (data) {
				console.log(JSON.stringify(data))
				req.flash('success', '发表成功!');
				res.redirect('/home'); //返回home
			};
		})
	});


	app.get('/p/:path', function(req, res) {
		var path = req.params.path;
		var single = new Single({
			path: path
		})
		single.getPost(function(err, data) {
			console.log(data)
			if (err) {
				console.log(err)
				req.flash('error', '出错了');
				return res.redirect('/');
				//return res.end(JSON.stringify(err));
			};
			if (data) {
				var da = data[0]
				res.render('article', {
					//"layout":"article.html",
					title: '文章页面',
					postTitle: da.title,
					success: req.flash('success').toString(),
					error: req.flash('error').toString(),
					user: req.session.user,
					postAuthor: da.userId,
					postDate: da.addDate,
					postSummary: da.summary,
					post: da.article,
				});
			};
		})



	});

	app.get('/help', function(req, res) {
		res.send('Birds home page');
	});
	// define the about route
	app.get('/help/about', function(req, res) {
		res.send('About birds');
	});

};