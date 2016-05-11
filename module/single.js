var conn = require('../conn')
var mysql = require('mysql')
var pool = mysql.createPool(conn);


function Single(options) {
	this.id = options && options.id;
};

module.exports = Single

Single.prototype = {
	getPost: function(callback) {
		var self = this;
		pool.getConnection(function(err, connection) {

			var selectSQL = 'select * from `article` WHERE `id`="'+ self.id +'"';
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
				callback(null,data)
				// And done with the connection.
				connection.release();
				// Don't use the connection here, it has been returned to the pool.
			});
		});
	}
}