var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morganLog = require('morgan');
const logger = require('./logger')
const {USER_COOKIE_SECRET} = require('./config')

var usersRouterV1 = require('./routes/v1/users');
var budgetRouterV1 = require('./routes/v1/budgets');

var app = express();

app.use(morganLog('dev'));
app.use(require('helmet')())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(USER_COOKIE_SECRET));

app.disable("etag");
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use('/api/v1/users', usersRouterV1);
app.use('/api/v1/budgets', budgetRouterV1);
app.use('/api/v1/health', (req, res) => res.sendStatus(200));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // logger.error(err.status)
  // logger.debug(err.stack)
});

module.exports = app;
