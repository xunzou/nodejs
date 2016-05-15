/*var conn = require('../conn')
var mysql = require('mysql')
var pool = mysql.createPool(conn);*/
var query = require('../config/pool')
var md5 = require("./util/md5");



function Post(options) {
	this.title = options.title;
	this.summary = options.summary;
	this.article = options.article;
	this.cate = options.cate;
	this.userId = options.userId;
};

module.exports = Post

Post.prototype = {
	saveArticle: function(callback) {
		var self = this;
		var insertSQL = 'insert into article(title,summary,article,addDate,userId,cate) values("' + self.title + '","' + self.summary + '","' + self.article + '","' + Date.parse(new Date()) + '","' + self.userId + '","' + self.cate + '");';
		query(insertSQL, function(err, data, fields) {
			if (err) {
				console.log(err,44)
				//connection.release();
				return callback(err)
			};
			var insertId = data.insertId,
				idMD5 = md5(insertId)

			var updateSQL = 'update article set path="'+ idMD5.substring(5,17) +'" where id="'+ insertId +'"'
			query(updateSQL, function(err, data, fields) {
				console.log('更新成功')
				console.log(data),"' + self.userId + '"
				callback(null,data)
			});
			console.log('--------------------------INSERT----------------------------');
			//console.log(rows)
			console.log('--------------------------INSERT----------------------------');
		});




		/*pool.getConnection(function(err, connection) {

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
		});*/
	},

	getCate: function(callback) {
		var self = this;
		var insertSQL = 'select cateId,cateName from category WHERE userId="' + self.userId + '"';
		query(insertSQL, function(err, data, fields) {
			if (err) {
				console.log(err)
				//connection.release();
				return callback(err)
			};			
			console.log('--------------------------select----------------------------');
			callback(null,data)
			//console.log(rows)
			console.log('--------------------------select----------------------------');
		});
	}
}