var fs = require('fs')
var csv = require('csv');
var _ = require('underscore');

var Processor = function(model,options){
  if (!model){
    throw new Error("model is a required constructor argument")
  }
  var model = model;
  var options = options ||  {}
  
  // HELPER FUNCTIONS
  /**
   * Get particalur item from model by keyname and value
   * params :- 
   *   source : Array
   *   obj :    Object {key:value}
   * 
   * return :-
   *   Object
   */
  var getItem = function(source,obj){
      var item = _.find(source,function(item){
        var keyName = Object.keys(obj)[0]
        return item[keyName] == obj[keyName]
      })
      return item;
  }
  this.getItem = getItem ;
  
  // END HLEPER FUNCTIONS
  
  // EXPOSE FUNCTIONS FOR TESTING
  this.TestFunctions =  {
    getItem : getItem 
  }
  // END EXPOSE
  
  /**
   * SourceFile is present in source component
   */
  var sourcefileName = "" //model.nodeDataArray[].fileName
  
  /**
   * Get destination merchant connector from model
   * Model can only have one destination connector
   */
  var destinationConnector = ""
  
  
  
  // var inputStream = fs.createReadStream(dir + '/' + fileName);
  // var outputStream = fs.createWriteStream(dir + '/' + fileName + ".out");
  // var processRow = function(){}
 
  // var getOutPutHeaderName  = function(inputFieldName){
  //       var link = _.find(model.linkDataArray,function(link){
  //       	return link.fromPort == inputFieldName
  //       })
  //       return link.toPort ;
  //   }
    
  // var transformRow = function(row,cb) {
	// console.log("row",row)
	// cb(null,row)
	// }

  //  this.processFile = function(cb){
	// 	inputStream.pipe(csv.parse({ columns: true }))
	// 		       .pipe(csv.transform(function (row, next) {
	// 		              transformRow(row,  function (err, outRow) {
	// 			                next(null,outRow)
	// 			              });
	// 			            }))
	// 		        .pipe(csv.stringify({ header: true })).pipe(outputStream);
	// 	outputStream.on('finish', function () {   
	// 		console.log("output stream is done")
	// 	    cb(null,null)
	// 		 })        
	// 	    }

}       

module.exports = Processor
