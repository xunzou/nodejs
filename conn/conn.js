var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '10.110.30.30',
	user: 'php',
	password: 'php'
});

connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id ' + connection.threadId);
});