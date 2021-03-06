//router
/*var md5 = require("../module/util/md5");
var Reg = require('../module/reg.js');*/
var user = require('./user.js')
var home = require('./home.js')
var post = require('./post.js')
var search = require('./search.js')
var cate = require('./cate.js')

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


var fs = require('fs')
var path = require('path')



module.exports = function(app) {

	function checkLogin(req, res, next) {
		if (!req.session.user) {
			//req.flash('error', '未登录!');
			return res.redirect('/login');
		}
		next();
	}

	function checkNotLogin(req, res, next) {
		if (req.session.user) {
			//req.flash('error', '已登录!');
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
	//get latest Post
	app.get('/', home.getLatestPostEjs);
	//get Random Post
	app.get('/', home.getRandomPostEjs);

	//get home article
	app.post('/getAllArticle.json', home.getLatestPost);

	//注册
	app.get('/reg', checkNotLogin)
	app.get('/reg', function(req, res) {
		res.render('reg', {
			title: '注册',
			nav: 'reg',
			//success: req.flash('success').toString(),
			//error: req.flash('error').toString(),
			success: 'success',
			error: 'error',
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
			//success: req.flash('success').toString(),
			//error: req.flash('error').toString(),
			success: 'success',
			error: 'error'
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
			//success: req.flash('success').toString(),
			//error: req.flash('error').toString(),
			success: 'success',
			error: 'error',
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
	//删除文章
	app.post('/post/del.json', post.delPost)

	//文章显示页
	app.get('/p/:path', post.getSingle);

	//获取编辑的文章
	app.get('/editPost/:path', checkLogin)
	app.get('/editPost/:path', post.getEditSingle);
	//保存编辑的文章`
	app.post('/editPost', checkLogin)
	app.post('/editPost', post.editSingle);

	//文章分类 
	app.get('/cate', checkLogin)
	app.get('/cate', cate.getCateList)
		//保存文章分类
	app.post('/cate', checkLogin)
	app.post('/cate', cate.saveCate)
		//删除分类
	app.post('/cate/del.json', cate.delCate)

	//搜索
	app.get('/search', function(req, res) {
		res.redirect('/search/1');
	})
	app.get('/search/:page', search.getArticle)

	//文章列表页面
	app.get('/list', function(req, res) {
		res.redirect('/list/1');
	})
	app.get('/list/:page', post.getPostList)

	//我的个人中心
	app.get('/myinfo', checkLogin)
	app.get('/myinfo', function(req, res) {
		res.render('myinfo', {
			title: 'myInfo',
			user: req.session.user,
			nav: 'myinfo',
		});
	});

	app.post('/uploadAvator', multipartMiddleware, function(req, res) {
		console.log(req.files);
		//get filename
		var filename = req.files.files.originalFilename || path.basename(req.files.files.path);
		var date = new Date(),
			year = '' + date.getFullYear(),
			month = date.getMonth() + 1,
			ymPath = month < 10 ? year + '0' + month : year + month;

		/*fs.stat('uploads',function(err,stats){
			if (err) {
				console.log(err)
			};
			console.log(stats)
		})*/
		//创建 uploads 目录
		if (!fs.existsSync('uploads')) {
			fs.mkdirSync('uploads');
		}
		fs.readdir('uploads/'+ymPath,function(err,files){
			if (err) {
				console.log(err)
			};
			console.log(files)
		})
		//创建 年月 目录
		if (!fs.existsSync('uploads/' + ymPath)) {
			fs.mkdirSync('uploads/' + ymPath);
		}

		//判断是否为空
		console.log(req.files.files.name)
		console.log(!req.files.files.name)
		if (!req.files.files.name) {
			res.json({
				//code: 304,
				error:'请选择文件'
			});
			return
		};



		//copy file to a upload directory
		var targetName = ymPath + '/' + Date.now() + path.extname(filename)
		var targetPath = path.dirname(__dirname) +'/uploads/' +  targetName;
		//copy file
		fs.createReadStream(req.files.files.path).pipe(fs.createWriteStream(targetPath));

		//return file url
		res.json({
			code: 200,
			msg: {
				url: 'http://' + req.headers.host + '/' + targetName
			}
		});
		// don't forget to delete all req.files when done

	});


	/*app.get('/help', function(req, res) {
		res.send('Birds home page');
	});
	// define the about route
	app.get('/help/about', function(req, res) {
		res.send('About birds');
	});*/
	//下面的页面是不让用户访问的页面
	//返回首页
	app.get('/p', function(req, res) {
		res.redirect('/');
	});
	//编辑文章
	app.get('/editPost', function(req, res) {
		res.redirect('/');
	});

};