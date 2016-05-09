var conn = require('../conn')
var mysql = require('mysql')
var pool = mysql.createPool(conn);
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


function Reg(user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
};

module.exports = Reg

Reg.prototype = {
	saveUser: function(callback) {
		var self = this;
		//要存入数据库的用户信息文档
		//var user =  this.name,this.password
		pool.getConnection(function(err, connection) {

			var insertSQL = 'insert into user(name,password) values("' + self.name + '",' + self.password + ');';
			console.log(insertSQL)
			// Use the connection
			connection.query(insertSQL, function(err, rows) {
				if (err) {
					console.log(err,44)
					connection.release();
					return callback(err)
				};

				console.log('--------------------------INSERT----------------------------');
				//console.log(rows)
				callback(null,rows)
				console.log('--------------------------INSERT----------------------------');

				// And done with the connection.
				connection.release();

				// Don't use the connection here, it has been returned to the pool.
			});
		});

	},
	getUser: function(name, callback) {
		pool.getConnection(function(err, connection) {
			var selectSQL = 'select * from user where name="'+ name +'"'
			console.log(selectSQL)
			// Use the connection
			connection.query(selectSQL, function(err, rows) {
				if (err) {
					console.log(err,68)
					connection.release();
					return callback(err)
				};

				console.log('--------------------------SELECT----------------------------');
				//console.log(rows)
				callback(null,rows)
				console.log('--------------------------SELECT----------------------------');

				// And done with the connection.
				connection.release();

				// Don't use the connection here, it has been returned to the pool.
			});
		});
	}
}