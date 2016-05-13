/*var conn = require('../conn')
var mysql = require('mysql')
var pool = mysql.createPool(conn);*/
/*pool.getConnection(function(err, connection) {
	// Use the connection
	connection.query('SELECT * FROM user', function(err, rows) {
		if (err) {
			console.log(err)
			return
		};

		console.log('--------------------------SELECT----------------------------');
		console.log(rows)
		console.log('------------------------------------------------------------');

		// And done with the connection.
		connection.release();

		// Don't use the connection here, it has been returned to the pool.
	});
});*/
var query = require('../config/pool')
var md5 = require("./util/md5");


function User(user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
};

module.exports = User

User.prototype = {
	saveUser: function(callback) {
		var self = this;
		var insertSQL = 'insert into user(name,password,regDate,lastDateLog) values("' + self.name + '","' + md5(self.password) + '",'+ Date.parse(new Date()) +','+ Date.parse(new Date()) +')';
		console.log(insertSQL)
		query(insertSQL, function(err, data, fields) {
			if (err) {
				//console.log(err)
				//connection.release();
				return callback(err)
			};

			//console.log('--------------------------INSERT----------------------------');
			//console.log(rows)
			callback(null, data)
			//console.log('--------------------------INSERT----------------------------');
		});

	},
	getUser: function(name, callback) {
		var selectSQL = 'select * from user where name="' + name + '"';
		query(selectSQL, function(err, data, fields) {
			if (err) {
				console.log(err)
					//connection.release();
				return callback(err)
			};

			console.log('--------------------------SELECT----------------------------');
			//console.log(rows)
			callback(null, data)
			console.log('--------------------------SELECT----------------------------');
		});
		/*pool.getConnection(function(err, connection) {
			var selectSQL = 'select * from user where name="' + name + '"'
			console.log(selectSQL)
				// Use the connection
			connection.query(selectSQL, function(err, rows) {
				if (err) {
					console.log(err, 68)
					connection.release();
					return callback(err)
				};

				console.log('--------------------------SELECT----------------------------');
				//console.log(rows)
				callback(null, rows)
				console.log('--------------------------SELECT----------------------------');

				// And done with the connection.
				connection.release();

				// Don't use the connection here, it has been returned to the pool.
			});
		});*/
	},
	updateDate:function(id,callback){
		var updateSQL = 'update user set lastDateLog=' + Date.parse(new Date()) + ' where id=' + id;
		query(updateSQL, function(err, data, fields) {
			if (err) {
				console.log(err)
					//connection.release();
				return callback(err)
			};

			//console.log('--------------------------SELECT----------------------------');
			//console.log(rows)
			callback(null, data)
			//console.log('--------------------------SELECT----------------------------');
		});
	}
}