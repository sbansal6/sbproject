// sample model
var model = { class: 'go.GraphLinksModel',
  linkFromPortIdProperty: 'fromPort',
  linkToPortIdProperty: 'toPort',
  nodeDataArray:
   [ { category: 'File',
       key: 'Source',
       fileName: 'Feed1.csv',
       fields: [Object],
       loc: '135 163',
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
       points: [Object] },
     { from: 'Source',
       to: 'Google',
       fromPort: 'name',
       toPort: 'ProductName',
       points: [Object] } ] }


var Processor = function(model){
	this.model = model;
    
    var testRun = function(){
    	
    }
}       