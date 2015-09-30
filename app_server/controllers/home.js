// file upload and download
// http://www.mindstick.com/Articles/5327b0f1-2d29-4c9b-b031-04b397107300/Upload%20and%20Download%20File%20in%20Node%20JS#.VfnnxCBVhBf
// https://sankartypo3.wordpress.com/2013/02/12/how-to-list-files-and-folders-using-nodejs/
var fs = require('fs')
var csv = require('csv');
var path=require('path');

var dir = "/Users/saurabhbansal/Google Drive/workspace/sbproject/public/uploaded/files"

var main = function (req, res) {
  res.render('home', { 
  	title: 'FeedExchange'
  });
};

var listFilesInDirectory = function(req,res){
	console.log("i am here in")
	var items = fs.readdirSync(dir);
	var files  = []
	for (var i in items){
        var name = dir + '/' + items[i];
        console.log(name)
        if (!(fs.statSync(name).isDirectory())){
            files.push(items[i]);
        } 
    }
    console.log("files",files)
    res.status(200).json(files);
}

var saveModel = function(req,res){
	var model = JSON.parse(req.body['model']) ;
	// save step
	// process step
	processFlow(model,function(err,result){
        console.log("processFlow is done")
		res.end("Model Saved");
	});

	
}

var processFlow = function(model,processFlowCb){
	var fileName = model.nodeDataArray[0].fileName
	var inputStream = fs.createReadStream(dir + '/' + fileName);
	var outputStream = fs.createWriteStream(dir + '/' + fileName + ".out");
    console.log(model)
    var model = { 
		    	class: 'go.GraphLinksModel',
		  linkFromPortIdProperty: 'fromPort',
		  linkToPortIdProperty: 'toPort',
		  nodeDataArray:
		   [ { category: 'File',
		       key: 'Source',
		       fileName: 'Feed1.csv',
		       fields: [Object],
		       loc: '110 162',
		       html: '<div title="Select File"> <form> FileName:<br> <select id="fileList" name="files"> </select> </form> </div>' },
		     { category: 'File',
		       key: 'Google',
		       fields: [Object],
		       loc: '485 160' } ],
		  linkDataArray:
		   [ { from: 'Source',
		       to: 'Google',
		       fromPort: 'ProdId',
		       toPort: 'ProductID',
		       points: [Object] } ]
        }

	var transformRow = function(row,cb) {
		console.log("row",row)
		cb(null,row)
	}
	inputStream.pipe(csv.parse({ columns: true }))
	           .pipe(csv.transform(function (row, next) {
		              transformRow(row,  function (err, outRow) {
		                next(null,outRow)
		              });
		            }))
	           .pipe(csv.stringify({ header: true })).pipe(outputStream);
	outputStream.on('finish', function () {   
		console.log("output stream is done")
        processFlowCb(null,null)
	 })        

}


var headers = function(req,res){
	var fileName = req.query["fileName"]
	getFileHeaders(fileName,function(err,result){
		if (err){
			res.status(500)
		} else {
			res.status(200).json(result);
		}
	})
}

var getFileHeaders = function(fileName,cb){
	var input = fs.createReadStream(dir + '/' + fileName);
	var n = 0;
	var parser = csv.parse({delimiter: ','})
	input.pipe(parser);
	var hit = false;
	var headers = "";
	var n = 0;
	parser.on('readable', function() {
		  n++;
		  if (!hit) {
		    var first = parser.read();
		    headers = first;
		    input.unpipe(parser);
		    parser.end();
		    hit = true;
		    cb(null,{headers:headers})
		  } 
        })
}


/*
* Retuuns a list of components
*/
var getComponents = function(){
	return require('../components/index.js')
}


module.exports.main = main ;
module.exports.headers  = headers;
module.exports.saveModel = saveModel ;
module.exports.listFilesInDirectory = listFilesInDirectory;
