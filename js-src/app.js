// This file runs the node app as a server and handles any configurations
// Run via /bin/www for further boilerplate configurations
// Additionally, `node /bin/www` must be tied to `npm start` in order to run on
// Azure

// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Expose all files to the server so they can import each other
app.use(express.static(path.join(__dirname, 'static')));

// Send index.html at the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
})

// catch 404 and forward to error handler
// This is **REQUIRED** for azure handling!
// https://github.com/MicrosoftDocs/azure-docs/issues/32472
app.use(function(req, res, next) {
  // next(createError(404));
  return res.sendStatus(404)
});

module.exports = app;
