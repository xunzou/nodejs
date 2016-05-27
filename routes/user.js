//用户相关
var md5 = require("../module/util/md5");
var User = require('../module/user.js');

exports.regPost = function(req, res) {
	var name = req.body.name,
		password = req.body.password,
		email = req.body.email;
	var user = new User({
		name: name,
		password: password,
		email: email
	})
	if (!name) {
		//req.flash('error', '用户名不能为空');
		return res.redirect('/reg'); //返回注册页
	};
	if (!email) {
		//req.flash('error', '邮箱不能为空');
		return res.redirect('/reg'); //返回注册页
	};
	if (!password) {
		//req.flash('error', '密码不能为空');
		return res.redirect('/reg'); //返回注册页
	};
	//console.log(name, password, email)
	user.getUser(name, function(err, rows) {
		//console.log(err, rows, 555888)
		if (rows.length) {
			console.log('用户已存在!')
				//req.flash('error', '用户已存在');
			return res.redirect('/reg'); //返回注册页
		};
		user.saveUser(function(err, rows) {
			if (err) {
				//console.log(err)
				//req.flash('error', err);
				return res.redirect('/reg'); //返回注册页
			};
			req.session.user = rows.name; //用户信息存入 session
			req.session.userId = rows.id; //用户id存入 session
			//req.flash('success', '注册成功!');
			//console.log(user)
			res.redirect('/home'); //返回home
			res.end()
		})

	})
};

exports.loginPost = function(req, res) {
	var name = req.body.name,
		password = req.body.password,
		o = {
			name: name,
			password: password
		};
	var user = new User(o)
	user.getUser(name, function(err, rows) {
		/*console.log(o)
			console.log(err, 1111)
			console.log(rows, 2222)*/
		if (!rows.length) {
			//console.log('暂无此人')
			//req.flash('error', '暂无此人');
			return res.redirect('/login'); //返回登录页
		};
		if (md5(password) != rows[0].password) {
			//console.log('密码不对哦！')
			//req.flash('error', '密码不对哦！');
			return res.redirect('/login'); //返回登录页
		};
		if (rows.length) {
			var userId = rows[0].id;
			//console.log('登录成功')
			//console.log(JSON.stringify(rows))
			//更新登录时间信息
			user.updateDate(userId, function(err, rows) {})

			req.session.user = rows[0].name; //用户信息存入 session
			req.session.userId = userId; //用户id存入 session
			//console.log(rows[0].name)
			//console.log(rows[0].id)
			//console.log(req.session.user)
			//req.flash('success', '登录成功!');
			res.redirect('/home'); //返回home
			res.end()
		};
	})
}

