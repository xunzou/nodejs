module.exports = function(app) {
	/* GET home page. */
	app.get('/', function(req, res) {
		res.render('index', {
			title: 'Express'
		});
	});

	app.get('/reg', function(req, res) {
		res.render('reg', {
			title: 'reg'
		});
	});
	// define the home page route
	app.get('/help', function(req, res) {
		res.send('Birds home page');
	});
	// define the about route
	app.get('/help/about', function(req, res) {
		res.send('About birds');
	});

};