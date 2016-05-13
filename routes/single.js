//单文章
var Single = require('../module/Single.js');

exports.getSingle = function(req, res) {
	var path = req.params.path;
	var single = new Single({
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
			var da = rows[0]
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



};