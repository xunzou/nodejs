//router
var Reg = require('../module/reg.js');
//var Login = require('../module/login.js');

module.exports = function(app) {

	function checkLogin(req, res, next) {
		if (!req.session.user) {
			req.flash('error', '未登录!');
			return res.redirect('/login');
		}
		next();
	}

	function checkNotLogin(req, res, next) {
		console.log(req.session.user,1111)
		if (req.session.user) {
			req.flash('error', '已登录!');
			return res.redirect('back'); //返回之前的页面
		}
		next();
	}


	/* GET home page. */
	app.get('/', function(req, res) {
		res.render('index', {
			title: 'Express',
			success: req.flash('success').toString(),
			error: req.flash('error').toString(),
			user: req.session.user
		});
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
		console.log(name, password, email)
		reg.getUser(name, function(err, user) {
			console.log(err, user)
			if (user.length) {
				console.log('用户已存在!')
				req.flash('error', '用户已存在'); 
				return res.redirect('/reg'); //返回注册页
			};
			reg.saveUser(function(err, user) {
				if (err) {
					console.log(err)
					return
				};
				req.session.user = user.name;//用户信息存入 session
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
			user:req.session.user,
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
			console.log(o)
			console.log(err, 1111)
			console.log(data, 2222)
			if (!data.length) {
				console.log('暂无此人')
				req.flash('error', '暂无此人'); 
				return
			};
			if (password != data[0].password) {
				console.log('密码不对哦！')
				req.flash('error', '密码不对哦！'); 
				return
			};
			if (data.length) {
				console.log('登录成功')
				console.log(JSON.stringify(data))
				req.session.user = data[0].name;//用户信息存入 session
				console.log(data[0].name)
				console.log(req.session.user)
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
			user: req.session.user
		});
	});

	app.get('/logout', function(req, res) {
		req.session.user = null
		res.redirect('/');
	});


	app.get('/help', function(req, res) {
		res.send('Birds home page');
	});
	// define the about route
	app.get('/help/about', function(req, res) {
		res.send('About birds');
	});

};