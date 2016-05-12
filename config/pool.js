var mysql = require('mysql');
var db = require('./db');
var pool = mysql.createPool(db);

var query = function(sql, callback) {
	pool.getConnection(function(err, conn) {
		if (err) {
			callback(err, null, null);
		} else {
			conn.query(sql, function(qerr, vals, fields) {
				//释放连接 
				conn.release();
				//事件驱动回调 
				callback(qerr, vals, fields);
			});
		}
	});
};

module.exports = query;


/*module.exports = {
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'mynode'
}
*/



/*
conn.connect();

var insertSQL = 'insert into user(name,password) values("xunzou1",123456),("haha1",123456)';
var selectSQL = 'select * from user limit 10';
var deleteSQL = 'delete from user where name = "xunzou"';
//delete from friends where user_name = 'simaopig';
var updateSQL = 'update user set name="你大爷" where name="xunzou1"';*/

/*conn.query(insertSQL,function (err, result) {
	if (err) {
		console.log(err)
		return
	};
	console.log('--------------------------INSERT----------------------------');
	console.log('INSERT ID:',result)
	console.log('------------------------------------------------------------');
	// body...
})*/

/*conn.query(selectSQL,function(err,result){
	if (err) {
		console.log(err)
		return
	};
	console.log('--------------------------SELECT----------------------------');
	console.log(result)
	console.log('------------------------------------------------------------');
	// body...
})*/
/*conn.query(deleteSQL,function(err,result){
	if (err) {
		console.log(err)
		return
	};
	console.log('--------------------------DELETE----------------------------');
	console.log(result)
	console.log('------------------------------------------------------------');
	// body...
})*/
/*conn.query(updateSQL,function(err,result){
	if (err) {
		console.log(err)
		return
	};
	console.log('--------------------------UPDDATE----------------------------');
	console.log(result)
	console.log('------------------------------------------------------------');
	// body...
})*/
//connection.end();