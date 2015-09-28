var options = {
    tmpDir:  __dirname + '/../../uploads/tmp',
    uploadDir: __dirname + '/../../uploads/files',
    uploadUrl:  '/uploaded/files/',
    storage : {
        type : 'local'
    }
};

module.exports = function (router) {
    router.get('/upload', function (req, res) {
        uploader.get(req, res, function (obj) {
            res.send(JSON.stringify(obj));
        });
    });
 
    router.post('/upload', function (req, res) {
        uploader.post(req, res, function (obj) {
            res.send(JSON.stringify(obj));
        });
    });
 
    router.delete('/uploaded/files/:name', function (req, res) {
        uploader.delete(req, res, function (obj) {
            res.send(JSON.stringify(obj));
        });
    });
    return router;
}