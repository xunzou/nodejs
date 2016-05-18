/*var conn = require('../conn')
var mysql = require('mysql')
var pool = mysql.createPool(conn);*/
var query = require('../config/pool')
var md5 = require("./util/md5");



function Cate(options) {
	this.cateName = options.cateName;
	this.cateDesc = options.cateDesc;
	this.cateId = options.cateId;
	this.userId = options.userId;
};

module.exports = Cate

Cate.prototype = {
	saveCate: function(callback) {
		var self = this;
		var insertSQL = 'insert into category(cateName,cateDesc,userId) values("' + self.cateName + '","' + self.cateDesc + '","' + self.userId + '")';
		query(insertSQL, function(err, data, fields) {
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
		query('set character set utf8',function(err, data, fields) {})
		var insertSQL = 'select * from category WHERE userId="' + self.userId + '"';
		query(insertSQL, function(err, data, fields) {
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