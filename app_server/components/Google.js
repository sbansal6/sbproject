
var GoogleFeedDestination = function(){
      var self = this;
      this.category = "File",
      this.key = "Google",
      this.fields = [
         { name: "ProductID", color: "#F7B84B", figure: "Ellipse" },
         { name: "ProductName", color: "#F25022", figure: "Ellipse" },
         { name: "Color", color: "#00BCF2" },
         { name: "Size", color: "#F7B84B", figure: "Ellipse" },
         { name: "Brand", color: "#F7B84B", figure: "Ellipse" },
         { name: "Description", color: "#F7B84B", figure: "Ellipse" },
     ],
     this.loc = "485 160"
  }

  module.exports = GoogleFeedDestination;  