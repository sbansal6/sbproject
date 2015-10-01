// External Imports
var assert = require('assert');
var expect = require('chai').expect;

// Internal Imports
var Processor = require('../processor');

describe('processor',function(){
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
    var options = {
    	dir : "/Users/saurabhbansal/Google Drive/workspace/sbproject/public/uploaded/files"
    }
	describe('test constructors',function(){
		it('test1',function(){
			var p = new Processor(model,options);
			expect(1).to.equal(1)
		})

	})
})
