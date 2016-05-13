var query = require('../config/pool')

/*var sql      = require('mysql');
var sqldb = require('../config/db');
var connection = sql.createConnection({
	host: '10.110.30.84',
	user: 'roc',
	password: '123456',
	database: 'test_servicedb'
});*/




function ArticleList(options) {
	this.userId = options && options.userId;
};

module.exports = ArticleList

ArticleList.prototype = {
	getArticle: function(callback) {
		var self = this;
		var selectSQL = 'select id,path,title,addDate from article order by id DESC limit 10';
		if (self.userId) {
			selectSQL = 'select id,path,title,addDate from article WHERE userId="' + self.userId + '" order by id DESC limit 10';
		};
		console.log(selectSQL)
		query(selectSQL, function(err, data, fields) {
			//console.log(data)
			if (err) {
				//console.log(err)
				//connection.release();
				return callback(err)
			};
			console.log(data)
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