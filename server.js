// EXTERNAL REQUIRES
var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var winston = require('winston');
var expressWinston = require('express-winston');

// CONFIG VARIABLES
var app = express();
var PORT = 3002;

// region Configure Mongoose
//require('./config/configureDB');
// endregion

// region Configure passport
//require('./lib/auth/passport')(passport);
// pass passport for configuration

// endregion

// region Configure Express
app.use(cookieParser());
app.use(bodyParser.json());
// support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// read cookies (needed for auth)
app.set('views', path.join(__dirname, '/app_server/views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
// set up ejs for templating
app.use(session({ secret: 'feed-exchange'}));
// session secret
app.use(passport.initialize());
app.use(passport.session());
// persistent login sessions
app.use(flash());
// use connect-flash for flash messages stored in session
// endregion

// region Configure Logger
expressWinston.responseWhitelist.push('body');
// /**
//  * Use Winston Logger
//  */
// app.use(expressWinston.logger({
//   transports: [new winston.transports.Console({
//       level: 'info',
//       json: true,
//       colorize: true
//     })],
//   meta: true,
//   msg: 'HTTP {{req.method}} {{req.url}} {{res}}',
//   expressFormat: true,
//   colorStatus: true
// }));
// /**
//  * Use Winston Error Logger
//  */
// app.use(expressWinston.errorLogger({
//   transports: [new winston.transports.Console({
//       json: true,
//       colorize: true
//     })],
//   meta: false,
//   msg: 'HTTP {{req.method}} {{req.url}}',
//   expressFormat: true,
//   colorStatus: true
// }));
// // endregion

// region Handle Routes
require('./routes/index')(app, passport);
// load our routes and pass in our app and fully configured passport
// endregion

// region Error Handler Middleware
/**
 * Error handler for all the applications
 */
app.use(function (err, req, res, next) {
  var body = {
    error: {
      message: err.message || '',
      type: err.name || '',
      code: err.code,
      error_subcode: err.subcode || err.code
    }
  };
  if (err.code == 500) {
    console.log('hahah');
  }
  res.status(err.status).json(body);
});
// endregion

// region Launch Server
app.listen(PORT, function () {
  console.log('Express server listening on port ' + PORT);
})  
// endregion
;