// file upload and download
// http://www.mindstick.com/Articles/5327b0f1-2d29-4c9b-b031-04b397107300/Upload%20and%20Download%20File%20in%20Node%20JS#.VfnnxCBVhBf
// https://sankartypo3.wordpress.com/2013/02/12/how-to-list-files-and-folders-using-nodejs/
var fs = require('fs')
var csv = require('csv');
var path=require('path');

var main = function (req, res) {
  res.render('home', { 
  	title: 'FeedExchange'
  });
};

var listFilesInDirectory = function(req,res){
	var dirname = __dirname + '/../../routes/uploads/files';
	console.log("dirname",dirname)
	var items = fs.readdirSync(dirname);
	var files  = []
	for (var i in items){
        var name = dirname + '/' + items[i];
        console.log(name)
        if (!(fs.statSync(name).isDirectory())){
            files.push(items[i]);
        } 
    }
    res.status(200).json(files);
}

var saveModel = function(req,res){
	console.log("I am here")
	console.log("Received Model",req.body["model"])
	processFlow(function(err,result){
        console.log("processFlow is done")
		res.end("Model Saved");
	});
	
}

var executeModel  = function(){

	var model = { "class": "go.GraphLinksModel",
  "linkFromPortIdProperty": "fromPort",
  "linkToPortIdProperty": "toPort",
		  "nodeDataArray": [
		{"category":"File", "key":"Source", "fileName":"", "fields":[ {"name":"ID", "color":"#F7B84B", "figure":"Ellipse"},{"name":"Name", "color":"#F7B84B", "figure":"Ellipse"} ], "loc":"85 160", "html":"<div title=\"Select File\"> <form> FileName:<br> <select id=\"fileList\" name=\"files\"> <option>test1.csv</option> <option>test2.csv</option> </select> </form> </div>"},
		{"category":"File", "key":"Google", "fields":[ {"name":"ProductID", "color":"#F7B84B", "figure":"Ellipse"},{"name":"ProductName", "color":"#F25022", "figure":"Rectangle"},{"name":"Color", "color":"#00BCF2", "figure":"Triangle"},{"name":"Brand", "color":"#F25022", "figure":"Rectangle"},{"name":"Description", "color":"#00BCF2", "figure":"Rectangle"} ], "loc":"485 160"}
		 ],
  "linkDataArray": [
		{"from":"Source", "to":"Google", "fromPort":"ID", "toPort":"ProductID", "points":[187.5,197.8265625000001,197.5,197.8265625000001,197.5,197.8265625,197.5,197.8265625,477.5,197.8265625,487.5,197.8265625]},
		{"from":"Source", "to":"Google", "fromPort":"Name", "toPort":"ProductName", "points":[187.5,219.8265625000001,197.5,219.8265625000001,197.5,219.8265625,197.5,219.8265625,477.5,219.8265625,487.5,219.8265625]}
		 ]}


	// get distinct from port (only read those fields from source file)	
	// rename fields to output alias as in google merchant feed 

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

var processFlow = function(processFlowCb){
	console.log("I am in processFlow")
	var inputStream = fs.createReadStream(__dirname + '/' + "test1.csv");
	var outputStream = fs.createWriteStream(__dirname + '/' + "test1out.csv");
    //processFlowCb()
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

var getFileHeaders = function(fileName,cb){
	var dirname = "/Users/saurabhbansal/Google Drive/workspace/sbproject/app_server/controllers/../../routes/uploads/files/"
	var input = fs.createReadStream(dirname + '/' + fileName);
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

/**
Handles file upload

*/
var upload = function(req,res){
    fs.readFile(req.files.image.path, function (err, data){ // readfilr from the given path
    var dirname = path.resolve(".")+'/uploads/'; // path.resolve(“.”) get application directory path
    var newPath = dirname +   req.files.image.originalname; // add the file name
    fs.writeFile(newPath, data, function (err) { // write file in uploads folder
    if(err){
          res.json("Failed to upload your file");
    }else {
          res.json("Successfully uploaded your file");
    }
    });
    });

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
module.exports.upload = upload ;
module.exports.listFilesInDirectory = listFilesInDirectory;
