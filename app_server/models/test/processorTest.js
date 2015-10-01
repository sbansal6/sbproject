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
            [ { category: 'Source',
                key: 'file',
                fileName: 'Feed1.csv',
                fields: [Object],
                loc: '135 163',
                html: '<div title="Select File"> <form> FileName:<br> <select id="fileList" name="files"> </select> </form> </div>' },
                { category: 'MerchantConnector',
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
    describe('constructors',function(){
        it('should pass, as we are passing both arguments',function(){
            var p = new Processor(model,options);
            expect(1).to.equal(1)
        })
    })
    describe('getItem',function() {
        it('should pass', function () {
            var source = [
                { category: 'File',
                    key: 'Source',
                    fileName: 'Feed1.csv',
                    fields: [Object],
                    loc: '135 163',
                    html: '<div title="Select File"> <form> FileName:<br> <select id="fileList" name="files"> </select> </form> </div>' },
                { category: 'Merchant',
                    key: 'Google',
                    fields: [Object],
                    loc: '485 160' }
            ]
            var obj = {key: 'Source'}
            var output = { category: 'File',
                key: 'Source',
                fileName: 'Feed1.csv',
                fields: [Object],
                loc: '135 163',
                html: '<div title="Select File"> <form> FileName:<br> <select id="fileList" name="files"> </select> </form> </div>' }
            var p = new Processor(model, options);
            expect(p.TestFunctions.getItem(source,obj)).to.deep.equal(output)
        })
    })
    describe('getFieldsMapping',function(){
        var linkDataArray =  [ { from: 'Source',
            to: 'Google',
            fromPort: 'ProdId',
            toPort: 'ProductID',
            points: [Object] },
            { from: 'Source',
                to: 'Google',
                fromPort: 'name',
                toPort: 'ProductName',
                points: [Object] } ]
        it('should pass',function(){
            var p = new Processor(model, options);
            var output  = { ProdId: 'ProductID', name: 'ProductName' }
            expect(p.TestFunctions.getFieldsMapping(linkDataArray)).to.deep.equal(output)
        })
    })
    describe('transformEachRow',function(){
        it('should pass',function(){
            var mappings =  { ProdId: 'ProductID', name: 'ProductName' }
            var row = {ProdId:"123",name:"test1","type":"sock"}
            var p  = new Processor(model,options)
            p.TestFunctions.transformEachRow(row,mappings)
        })

    })
})
