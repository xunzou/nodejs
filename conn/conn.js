var mysql = require('mysql');
var conn = mysql.createConnection({
	host: '10.110.30.30',
	user: 'php',
	password: 'php',
	database: 'mynode'
});

conn.connect();

var insertSQL = 'insert into user(name,password) values("xunzou1",123456),("haha1",123456)';
var selectSQL = 'select * from user limit 10';
var deleteSQL = 'delete from t_user';
var updateSQL = 'update t_user set name="conan update"  where name="conan"';

conn.query(insertSQL,function (err, results) {
	if (err) {
		console.log(err)
		return
	};
	console.log('--------------------------INSERT----------------------------');
	console.log('INSERT ID:',results)
	console.log('------------------------------------------------------------');
	// body...
})

//connection.end();