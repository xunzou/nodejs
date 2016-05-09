var conn = require('../conn')
var mysql = require('mysql')
var pool = mysql.createPool(conn);


function Post(options) {
	this.title = options.title;
	this.summary = options.summary;
	this.article = options.article;
	this.userId = options.userId;
};

module.exports = Post

Post.prototype = {
	saveArticle: function(callback) {
		var self = this;
		pool.getConnection(function(err, connection) {

			var insertSQL = 'insert into article(title,summary,article,userId) values("'+self.title+'","'+self.summary+'","'+self.article+'","'+self.userId+'");';
			console.log(insertSQL)
			// Use the connection
			connection.query(insertSQL, function(err, data) {
				console.log(err, data, 111111111)
				if (err) {
					console.log(err,44)
					connection.release();
					return callback(err)
				};

				console.log('--------------------------INSERT----------------------------');
				//console.log(rows)
				callback(null,data)
				console.log('--------------------------INSERT----------------------------');

				// And done with the connection.
				connection.release();
				// Don't use the connection here, it has been returned to the pool.
			});
		});
	}
}