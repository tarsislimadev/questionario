var fs = require('fs');
var path = require('path');
var createError = require('http-errors');
var express = require('express');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var config = require('./config');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var ajaxRouter = require('./routes/ajax');
var quizRouter = require('./routes/quiz');
var dashboardRouter = require('./routes/dashboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(logger('dev'));

app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['ABCDEF', 'A1B2C3'],
  maxAge: 96 * 60 * 60 * 1000 // 96 hours
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/ajax', ajaxRouter);
app.use('/quiz', quizRouter);
app.use('/dashboard', dashboardRouter);

app.set('trust proxy', 1); // trust first proxy

app.use(function (req, res, next) {
  var canShowPage = false;

  if (config.externalPaths.indexOf(req.url) != -1) canShowPage = true;
  if (req.url.indexOf('/ajax') == 0) canShowPage = true;
  try { 
    if (fs.statSync(__dirname + '/public' + req.url).isFile()) canShowPage = true;
  } catch(e) { }

  if (canShowPage) next();
  else if (res.session && res.session.id) next();
  else {
    res.locals.message = 'Faça login para acessar essa página';
    res.locals.error = new Error('Permissão negada.');

    res.status(403);
    res.render('error');
  }

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
