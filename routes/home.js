var homeCtrl = require('../app_server/controllers/home');
module.exports = function (app) {
  // =====================================
  // HOME PAGE  ========
  // =====================================
  app.get('/', homeCtrl.main);
};