var conn = require('../conn')
var mysql = require('mysql')
var pool = mysql.createPool(conn);


function Login(user) {
	this.name = user.name;
	this.password = user.password;
};

module.exports = Login

Login.prototype = {
	userLogin: function(o, callback) {
		pool.getConnection(function(err, connection) {
			var selectSQL = 'select * from user where name="'+ o.name +'" and  password="'+ o.password +'"'
			console.log(selectSQL)
			// Use the connection
			connection.query(selectSQL, function(err, rows) {
				console.log(err, rows,111111111)
				if (rows.len == 0) {
					console.log("用户名或密码错误")
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