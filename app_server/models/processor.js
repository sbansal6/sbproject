var fs = require('fs')
var csv = require('csv');
var _ = require('underscore');

var Processor = function(model,options){
  if (!model){
    throw new Error("model is a required constructor argument")
  }
  var model = model;
  var options = options ||  {}
  var fileName = model.nodeDataArray[0].fileName
  var inputStream = fs.createReadStream(dir + '/' + fileName);
  var outputStream = fs.createWriteStream(dir + '/' + fileName + ".out");
  var processRow = function(){}
 
  var getOutPutHeaderName  = function(inputFieldName){
        var link = _.find(model.linkDataArray,function(link){
        	return link.fromPort == inputFieldName
        })
        return link.toPort ;
    }
    
  var transformRow = function(row,cb) {
	console.log("row",row)
	cb(null,row)
	}

   this.processFile = function(cb){
		inputStream.pipe(csv.parse({ columns: true }))
			       .pipe(csv.transform(function (row, next) {
			              transformRow(row,  function (err, outRow) {
				                next(null,outRow)
				              });
				            }))
			        .pipe(csv.stringify({ header: true })).pipe(outputStream);
		outputStream.on('finish', function () {   
			console.log("output stream is done")
		    cb(null,null)
			 })        
		    }

}       

module.exports = Processor
