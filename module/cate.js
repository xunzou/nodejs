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
		var insertSQL = 'insert into category(cateName,cateDesc,userId) values(' + self.cateName + ',' + self.cateDesc + ',' + self.userId + ')';
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