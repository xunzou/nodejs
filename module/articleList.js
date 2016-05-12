var query = require('../config/db')

function ArticleList(options) {
	this.userId = options && options.userId;
};

module.exports = ArticleList

ArticleList.prototype = {
	getArticle: function(callback) {
		var self = this;
		var selectSQL = 'select id,title,addDate from article order by id DESC limit 10';
		if (self.userId) {
			selectSQL = 'select id,title,addDate from article WHERE userId="' + self.userId + '" order by id DESC limit 10';
		};
		console.log(selectSQL)
		query(selectSQL, function(err, data, fields) {
			//console.log(data)
			if (err) {
				console.log(err, '--------------------articleList-------------------')
				//connection.release();
				return callback(err)
			};

			console.log('--------------------------SELECT----------------------------');
			//console.log(rows)
			callback(null, data)
			console.log('--------------------------SELECT----------------------------');
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
	}
}