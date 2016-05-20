/*var conn = require('../conn')
var pool = mysql.createPool(conn);*/
var mysql = require('mysql')
var query = require('../config/pool')
var md5 = require("./util/md5");



function Post(options) {
	this.title = mysql.escape(options.title);
	this.summary = mysql.escape(options.summary);
	this.article = mysql.escape(options.article);
	this.click = options.click;
	this.cate = options.cate;
	this.userId = options.userId;
};

module.exports = Post

Post.prototype = {
	saveArticle: function(callback) {
		var self = this;
		var insertSQL = 'insert into article(title,summary,article,addDate,userId,cate) values(' + self.title + ',' + self.summary + ',' + self.article + ',' + Date.parse(new Date()) + ',' + self.userId + ',' + self.cate + ');';
		query(insertSQL, function(err, data, fields) {
			if (err) {
				console.log(err)
					//connection.release();
				return callback(err)
			};
			var insertId = data.insertId,
				idMD5 = md5(insertId)

			var updateSQL = 'update article set path="' + idMD5.substring(5, 17) + '" where id="' + insertId + '"'
			query(updateSQL, function(err, data, fields) {
				console.log('更新成功')
				//console.log(data, "' + self.userId + '")
				callback(null, data)
			});
			//console.log('--------------------------INSERT----------------------------');
			//console.log(rows)
			//console.log('--------------------------INSERT----------------------------');
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
	editPost: function(postObj, callback) {
		var updateSQL = 'update article set title=' +  mysql.escape(postObj.title) + ',cate=' + postObj.cate + ',summary=' +  mysql.escape(postObj.summary) + ',article = ' + mysql.escape(postObj.article) + ',updateDate=' + Date.parse(new Date()) + ' where userId = ' + postObj.userId + ' and path = "' + postObj.path + '"';
		console.log(updateSQL)
		query(updateSQL, function(err, rows, fields) {
			if (err) {
				//console.log(err)
				//connection.release();
				return callback(err)
			};
			callback(null, rows)
		});
	},
	getPost: function(callback) {
		var self = this;
		var selectSQL = 'select a.*,b.name from article a,user b WHERE path="' + this.path + '" and b.id = a.userId';
		query(selectSQL, function(err, rows, fields) {
			if (err) {
				//console.log(err)
				//connection.release();
				return callback(err)
			};
			//增加点击量
			if (self.click) {
				query('update article set click=click + 1 where path="' + self.path + '"', function(err, clickRows, fields) {
					//console.log(clickRows)
				});
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
		});
	},

	getCateList: function(callback) {
		var self = this;
		var insertSQL = 'select cateId,cateName from category WHERE userId="' + self.userId + '"';
		query(insertSQL, function(err, data, fields) {
			if (err) {
				console.log(err)
					//connection.release();
				return callback(err)
			};
			console.log('--------------------------select----------------------------');
			callback(null, data)
				//console.log(rows)
			console.log('--------------------------select----------------------------');
		});
	},
	delPost: function(path,callback){
		var delSQL = 'delete from article WHERE userId="' + this.userId + '" and path="'+ path +'"';
		query(delSQL, function(err, data, fields) {
			if (err) {
				return callback(err)
			};			
			callback(null,data)
		});
	}
}



