//router
/*var md5 = require("../module/util/md5");
var Reg = require('../module/reg.js');*/
var user = require('./user.js')
var home = require('./home.js')
var post = require('./post.js')
var single = require('./single.js')
var ArticleList = require('../module/articleList.js');


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
	app.get('/', home.getLatestPostEjs);

	//get home article
	app.post('/getAllArticle.json', home.getLatestPost);

	//注册
	app.get('/reg', checkNotLogin)
	app.get('/reg', function(req, res) {
		res.render('reg', {
			title: '注册',
			nav: 'reg',
			success: req.flash('success').toString(),
			error: req.flash('error').toString(),
			user: req.session.user
		});

	});
	app.post('/reg', checkNotLogin)
	app.post('/reg', user.regPost)
	//登录
	app.get('/login', checkNotLogin)
	app.get('/login', function(req, res) {
		res.render('login', {
			title: 'login',
			nav: 'login',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	app.post('/login', checkNotLogin)
	app.post('/login', user.loginPost);

	// define the home page route
	app.get('/home', checkLogin)
	app.get('/home', function(req, res) {
		res.render('home', {
			title: 'home',
			nav: 'home',
			success: req.flash('success').toString(),
			error: req.flash('error').toString(),
			user: req.session.user
		});
	});
	app.post('/home/getArticle.json', home.getHomePost);



	app.get('/logout', function(req, res) {
		req.session.user = null
		req.session.userId = null
		res.redirect('/');
	});



	// define the post page route
	//发表文章
	app.get('/post', checkLogin)
	app.get('/post', post.getCatePost);
	//提交文章
	app.post('/post', checkLogin)
	app.post('/post', post.savePost);
	
	//文章显示页
	app.get('/p/:path', single.getSingle);

	//获取编辑的文章
	app.get('/editPost/:path', checkLogin)
	app.get('/editPost/:path', single.getEditSingle);
	//保存编辑的文章`
	app.post('/editPost', checkLogin)
	app.post('/editPost', single.editSingle);

	/*app.get('/help', function(req, res) {
		res.send('Birds home page');
	});
	// define the about route
	app.get('/help/about', function(req, res) {
		res.send('About birds');
	});*/
	//下面的页面是不让用户访问的页面
	//返回首页
	app.get('/p',function(req, res) {
		res.redirect('/');
	});
	//返回首页
	app.get('/editPost',function(req, res) {
		res.redirect('/');
	});

};