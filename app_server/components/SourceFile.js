/**
   * Define soure file component :-
   * Properties:- 
   *    FileName : Select file from directory (Phase 1)
   *    Html :- Dynamic html for popup box (Phase 1)
   *    Fields:- Array of Fields in fileName, drop down check box (Phase 2), update html
   *    FileProperties: Define file properties like file type (Phase 2), update html
   * 
   */
   var SourceFileComponent = function(){
    var self = this ;
    this.category = "File"
    this.key = "Source"
    this.fileName = ""
    this.fields = []
    this.loc = "85 160"
    this.html = '<div> <form> FileName:<br> <input id="textInput" type="text" name="firstname"> </form> </div>'
    this.editNode = function(e,obj){
        $(self.html)
                .appendTo('body')
                .dialog({
                    modal: true,
                    width: 425,
                    height: 275,
                    buttons: {
                        OK: function(){
                            var fileName = $('#textInput').val();
                            // get all headers for this file using server rest api call
                            var data = myDiagram.model.findNodeDataForKey(self.key)
                            var newFields = [
                            { name: "ProductID", color: "#F7B84B", figure: "Ellipse" },
                            { name: "ProductName", color: "#F7B84B", figure: "Ellipse" }
                            ]
                            myDiagram.model.setDataProperty(data,"fields",newFields)
                            $(this).dialog('close');

                        },
                        CANCEL : function(){
                            $(this).dialog('close');
                        }
                    }
                });
     }
  }

  module.exports = SourceFileComponent;