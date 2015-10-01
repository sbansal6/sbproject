var fs = require('fs')
var csv = require('csv');
var _ = require('underscore');

/**
 * Processor object/class is responsible for processing the model
 * params:-
 *   model : object : required
 *   options : object : optional
 */
var Processor = function(model,options){
  if (!model){
    throw new Error("model is a required constructor argument")
  }
  /**
   * Source component object from model
   */
  var sourceComponent  = sourceComponent || getItem(model.nodeDataArray,{category: 'Source'});
  /**
   * Merchant Connector Object
   * This can be extracted from model or if object grows big in future
   *      get it from components library
   */
  var merchantConnector  = merchantConnector || getItem(model.nodeDataArray,{category: 'MerchantConnector'});
  
  /**
   * function that actually process input and converts to ouput 
   *  1) Reads input line by line
   *  2) ****phase2 applies middleware (cleanup functions) if specified  to each field
   *  3) converts to output field
   *  4) field analysis based on rules (every merchant connector has rules associated with it)
   * 
   */
  var process = function(){
    
  }
  
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
  
  // END HLEPER FUNCTIONS
  
  // EXPOSE FUNCTIONS FOR TESTING
  this.TestFunctions =  {
    getItem : getItem 
  }
  // END EXPOSE
  
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
