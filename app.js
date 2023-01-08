var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const authMiddleware = require('./lib/authMiddleware');

var indexRouter = require('./routes/index');
var adsRouter = require('./routes/api/ads');

require('./lib/connectMongoose');

var app = express();

app.locals.title = 'Nodepop';

var router = express.Router();
router.use(function (req, res, next) {
req.user = userModel.find(req.body.userId);
next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes of my API
 */
app.use('/apiv1/ads', authMiddleware, require('./routes/api/ads'));

/**
 * Routes to my Website
 */

app.use('/', function(req, res, next) {
  console.log('recibo una petición');
  next();
})

app.use('/', indexRouter);

// Route to ads
app.use('/apiv1/ads', adsRouter);
app.use('/images/ads', express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // check if there is any validation error
  if (err.array) {
    err.status = 422; // validation error
    const errorInfo = err.array({ onlyFirstError: true})[0];
    console.log(errorInfo);
    err.message = `Error in ${errorInfo.location}, param "${errorInfo.param}" ${errorInfo.msg}`;
  }

  res.status(err.status || 500);

  // if it's an API request, answer with JSON format
  if (req.originalUrl.startsWith('/apiv1/')) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;