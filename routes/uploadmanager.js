// config the uploader
var options = {
    tmpDir:  __dirname + '/uploads/tmp',
    uploadDir: __dirname + '/uploads/files',
    uploadUrl:  '/uploaded/files/',
    storage : {
        type : 'local'
    }
 };
var uploader = require('blueimp-file-upload-expressjs')(options);
module.exports = function(app) {
    app.get('/upload', function(req, res) {
        uploader.get(req, res, function(err, obj) {
            res.send(JSON.stringify(obj));
        });

    });

    app.post('/upload', function(req, res) {
        uploader.post(req, res, function(err, obj) {
            res.send(JSON.stringify(obj));
        });

    });

    app.delete('/uploaded/files/:name', function(req, res) {
        uploader.delete(req, res, function(err, obj) {
            res.send(JSON.stringify(obj));
        });
    });
   
}
