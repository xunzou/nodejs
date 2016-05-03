//router
var Reg = require('../module/reg.js');

module.exports = function(app) {

	function checkLogin(req, res, next) {
		if (!req.session.user) {
			req.flash('error', '未登录!');
			return res.redirect('/login');
		}
		next();
	}

	function checkNotLogin(req, res, next) {
		console.log(arguments)
		if (req.session.user) {
			req.flash('error', '已登录!');
			return res.redirect('back'); //返回之前的页面
		}
		next();
	}


	/* GET home page. */
	app.get('/', function(req, res) {
		res.render('index', {
			title: 'Express'
		});
	});


	app.get('/reg', checkNotLogin)
	app.get('/reg', function(req, res) {
		res.render('reg', {
			title: 'reg'
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
				return res.redirect('/reg'); //返回注册页
			};
			reg.saveUser(function(err, user) {
				if (err) {
					console.log(err)
					return
				};
				console.log(user)
				res.redirect('/home'); //返回注册页
			})

		})
	})

	app.get('/login', checkNotLogin)
	app.get('/login', function(req, res) {
		res.render('login', {
			title: 'login'
		});
	});
	app.post('/login', checkNotLogin)
	app.post('/login', function(req, res) {
		
	});

	// define the home page route
	app.get('/home', checkNotLogin)
	app.get('/home', function(req, res) {
		res.render('home', {
			title: 'home'
		});
	});
	app.get('/help', function(req, res) {
		res.send('Birds home page');
	});
	// define the about route
	app.get('/help/about', function(req, res) {
		res.send('About birds');
	});

};