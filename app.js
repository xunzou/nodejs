var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
var conn = require('./conn')
var sessionStore = new MySQLStore(conn);
var flash = require('connect-flash');
//路由
var routes = require('./routes/routes.js');
/*var reg = require('./routes/reg');
var help = require('./routes/help');*/
//模板引擎
var ejs = require('ejs');
//express
var app = express();

// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 按照上面的解释，设置 session 的可选参数
app.use(session({
  key: 'mynodejs',
  secret: 'mynodejs_secret',
  store: sessionStore,
  cookie:{maxAge:300000},
  resave: true,
  saveUninitialized: true
}));


/*app.use('/', routes);
app.use('/reg', reg);
app.use('/help', help);*/
//路由总接口
routes(app)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;