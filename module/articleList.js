var query = require('../config/pool')
function ArticleList(options) {
	this.userId = options && options.userId;
	this.selectSQL = options && options.selectSQL;
};

module.exports = ArticleList

ArticleList.prototype = {
	getArticle: function(callback) {
		var self = this;
		var selectSQL = 'select id,path,title,addDate from article order by id DESC limit 10';
		if (this.userId) {
			selectSQL = 'select id,path,title,addDate from article WHERE userId="' + this.userId + '" order by id DESC limit 10';
		};
		if (this.selectSQL) {
			selectSQL = this.selectSQL
		};
		console.log(selectSQL)
		query(selectSQL, function(err, data, fields) {
			//console.log(data)
			if (err) {
				//console.log(err)
				//connection.release();
				return callback(err)
			};
			//console.log(data)
			callback(null, data)
		});
		/*pool.getConnection(function(err, connection) {
			// Use the connection
			connection.query(selectSQL, function(err, data) {
				//console.log(arguments)
				//console.log(err)
				//console.log(fields)
				console.log(data)
				if (err) {
					console.log(err, '--------------------articleList-------------------')
					connection.release();
					return callback(err)
				};

				console.log('--------------------------SELECT----------------------------');
				//console.log(rows)
				callback(null, data)
				console.log('--------------------------SELECT----------------------------');

				// And done with the connection.
				connection.release();
				// Don't use the connection here, it has been returned to the pool.
			});
		});*/
	}/*,
	getPost:function(callback){
		//connection.query('select id,path,title,addDate from article order by id DESC limit 10', function(err, data) {
		connection.query('select * from t_pro_blog_post order by id DESC limit 10', function(err, data) {
			console.log(data,71)
			if (err) {
				connection.end()
				return callback(err)
			};
		  	callback(null, data)
		  	connection.end()
		});
	}*/
}