var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session'); // 追加

//ルーティング追加するときはここに追加する
var routes = require('./routes/index');
var register = require('./routes/register');
var login = require('./routes/login');
var sessioncheck = require('./routes/sessioncheck');
var logout = require('./routes/logout');
var welcome = require('./routes/welcome');
var setting = require('./routes/setting');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//cookieの設定
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

//ルーティング追加するときはここに追加する

app.use('/register', register);
app.use('/login', login);
app.use('/welcome', welcome);
app.use('/', sessioncheck);
app.use('/', routes);
app.use('/logout', logout);

//ここで失敗している
//app.use('/welcome', welcome);

var domain = require('express-domain-middleware');
app.use(domain);

// exception handlers
app.use(function(err, req, res, next) {
  logger.error.fatal(err);
});

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
