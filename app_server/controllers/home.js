var fs = require('fs')
var csv = require('csv');


var main = function (req, res) {
  res.render('home', { 
  	title: 'FeedExchange'
  });
};

var listFilesInDirectory = function(){

}

var saveModel = function(){

}

var executeModel = function(){

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
	console.log("i am called")
	var input = fs.createReadStream(__dirname + '/' + fileName);
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
module.exports.headers  = headers