module.exports = function (app, passport) {
  require('./home')(app);
  require('./api')(app);
};