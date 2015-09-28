var express = require('express');

module.exports = function (app, passport) {
  require('./home')(app);
  require('./api')(app);
  require('./uploadmanager')(app);
};