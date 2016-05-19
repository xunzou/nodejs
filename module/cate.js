/*var conn = require('../conn')
var pool = mysql.createPool(conn);*/
var mysql = require('mysql')
var query = require('../config/pool')
var md5 = require("./util/md5");

function Cate(options) {
	this.cateName = mysql.escape(options.cateName);
	this.cateDesc = mysql.escape(options.cateDesc);
	this.cateId = options.cateId;
	this.userId = options.userId;
};

module.exports = Cate

Cate.prototype = {
	saveCate: function(callback) {
		var self = this;
		var saveSQL = 'insert into category(cateName,cateDesc,userId) values(' + this.cateName + ',' + this.cateDesc + ',' + this.userId + ')';
		//如果有cateId 则是编辑
		if (this.cateId) {
			saveSQL = 'update category set cateName=' + this.cateName + ',cateDesc=' + this.cateDesc + ' where cateId="' + this.cateId + '" and userId=" ' + this.userId + ' "';
		};
		query(saveSQL, function(err, data, fields) {
			if (err) {
				console.log(err)
				//connection.release();
				return callback(err)
			};
			callback(null,data)
		});
	},

	getCateList: function(callback) {
		var self = this;
		var getSQL = 'select * from category WHERE userId="' + self.userId + '"';
		query(getSQL, function(err, data, fields) {
			if (err) {
				console.log(err)
				//connection.release();
				return callback(err)
			};			
			//console.log('--------------------------select----------------------------');
			callback(null,data)
			//console.log(rows)
			//console.log('--------------------------select----------------------------');
		});
	}
}