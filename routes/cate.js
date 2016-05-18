//文章
var Cate = require('../module/cate.js');

exports.getCateList = function(req, res) {
	var userId = req.session.userId,
		cate = new Cate({
			userId: userId
		});
	cate.getCateList(function(err, rows) {
		if (err) {
			//console.log(err)
			//req.flash('error', '出错了');
			return res.redirect('/home'); //返回文章页
		};
		if (rows) {
			//console.log(rows)
			res.render('cate', {
				title: '文章分类',
				nav: 'cate',
				cate: rows,
				//success: req.flash('success').toString(),
				//error: req.flash('error').toString(),
				user: req.session.user
			});
			res.end()
		};
	})

};

exports.saveCate = function(req, res) {
	var cateName = req.body.cateName,
		cateDesc = req.body.cateDesc,
		//cate = req.body.cate,
		userId = req.session.userId,
		o = {
			cateName: cateName,
			cateDesc: cateDesc,
			userId: userId
		};
	console.log(o)
	var cate = new Cate(o)
	cate.saveCate(function(err, rows) {
		if (err) {
			//console.log(err)
			req.flash('error', '出错了');
			return res.redirect('/cate'); //返回编辑页
		};
		if (rows) {
			//console.log(JSON.stringify(rows))
			req.flash('success', '发表成功!');
			res.redirect('/cate'); //返回home
			res.end()
		};
	})
};