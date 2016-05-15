/*var conn = require('../conn')
var mysql = require('mysql')
var pool = mysql.createPool(conn);*/
var query = require('../config/pool');

function Single(options) {
	this.path = options && options.path;
};

module.exports = Single

Single.prototype = {
	getPost: function(callback) {
		var selectSQL = 'select a.*,b.name from article a,user b WHERE path="' + this.path + '" and b.id = a.userId';
		query(selectSQL, function(err, rows, fields) {
			if (err) {
				//console.log(err)
				//connection.release();
				return callback(err)
			};
			//console.log(rows[0].cate)
			if (rows[0].cate != 0 && rows[0].cate !== null) {
				var selectCateSQL = 'select cateName from category where cateId=' + rows[0].cate;
				query(selectCateSQL, function(error, data, field) {
					if (error) {
						//console.log(error)
					};
					if (data) {
						//console.log(data)
						rows[0].cateName = data[0].cateName
					};
					callback(null, rows)
				});
			} else {
				rows[0].cateName = '未分类'
				callback(null, rows)
			}
			//console.log('--------------------------SELECT----------------------------');
			//console.log(rows)

			//console.log('--------------------------SELECT----------------------------');
		});
		/*pool.getConnection(function(err, connection) {

			var selectSQL = 'select * from article` WHERE `id`="' + this.id + '"';
			console.log(selectSQL)
				// Use the connection
			connection.query(selectSQL, function(err, data) {
				//console.log(arguments)
				//console.log(err)
				//console.log(fields)
				console.log(data)
				if (err) {
					connection.release();
					return callback(err)
				};
				callback(null, data)
					// And done with the connection.
				connection.release();
				// Don't use the connection here, it has been returned to the pool.
			});
		});*/
	},
	editPost: function(postObj, callback) {
		var updateSQL = 'update article set title="' + postObj.title + '",cate=' + postObj.cate + ',summary="' + postObj.summary + '",article = "' + postObj.article + '",updateDate=' + Date.parse(new Date()) + ' where userId = ' + postObj.userId + ' and path = "' + postObj.path + '"';
		console.log(updateSQL)
		query(updateSQL, function(err, rows, fields) {
			if (err) {
				//console.log(err)
				//connection.release();
				return callback(err)
			};
			callback(null, rows)
		});
	}
}