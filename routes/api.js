var homeCtrl = require('../app_server/controllers/home');

module.exports = function (app) {
  // =====================================
  // HOME PAGE  ========
  // =====================================
  app.get('/api/fileheaders', homeCtrl.headers);
  app.post('/api/savemodel',homeCtrl.saveModel);
  app.get('/api/listdirectory',homeCtrl.listFilesInDirectory);
};
