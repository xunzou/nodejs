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
	this.path = options.path;
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
	editPost: function(callback) {
		var updateSQL = 'update article set title=' +  this.title + ',cate=' + this.cate + ',summary=' +  this.summary + ',article = ' + this.article + ',updateDate=' + Date.parse(new Date()) + ' where userId = ' + this.userId + ' and path = "' + this.path + '"';
		console.log(updateSQL)
		query(updateSQL, function(err, rows, fields) {
			console.log(err)
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
			//console.log(rows[0])
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
		var insertSQL = 'select cateId,cateName from category WHERE userId="' + this.userId + '"';
		query(insertSQL, function(err, data, fields) {
			if (err) {
				console.log(err)
					//connection.release();
				return callback(err)
			};
			//console.log('--------------------------select----------------------------');
			callback(null, data)
				//console.log(rows)
			//console.log('--------------------------select----------------------------');
		});
	},
	getPostList: function(o,callback) {
		var o = o || {},
			cp = o && o.currentPage,
			ps = o && o.pageSize;
		var m = (cp-1) * ps;

		var selectSQL = 'select id,path,title,addDate from article order by id desc limit '+ m +','+ ps + '';
		//console.log(selectSQL)
		query(selectSQL, function(err, data, fields) {
			var result = {
				error:null,
				paging:{},
				result:data
			}
			//console.log(data)
			if (err) {
				//console.log(err)
				//connection.release();
				return callback(err)
			};
			//查询总条数
			query('SELECT COUNT(id) FROM article', function(err, countData, fields) {
				var totalRecords = countData[0]['COUNT(id)'],
					totalPages = Math.ceil(totalRecords/ps)
				//总数据
				result.paging.totalRecords = totalRecords
				//总页数
				result.paging.totalPages = totalPages
				//当前页
				result.paging.currentPage = cp
				//当前显示的数据条数
				result.paging.pageSize = ps
				//页数错误
				if (cp>totalPages) {
					return callback({message:'不存在此页'}, result)
				};
				callback(null, result)
			});
			//console.log(data)
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



