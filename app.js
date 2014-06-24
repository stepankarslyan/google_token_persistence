var argv = require('optimist')
    .default({ 
      subConn: "tcp://localhost:1112",
      mongoConn: "mongodb://localhost/test" 
    })
    .argv;
var mongoose = require("mongoose");
mongoose.connect(argv.mongoConn);
var zmq = require("zmq");
var subscriber = zmq.socket("sub");
subscriber.connect(argv.subConn);
subscriber.subscribe("");
console.log("Connecting to the " + argv.subConn);

var schema = new mongoose.Schema({
  id: String,
  tokens: Object
});

var UserAccess = mongoose.model("UserAccess", schema);

subscriber.on("message", function(data) {
  console.log("Data from pub : " + data);
  var userAccess = JSON.parse(data);
  
  UserAccess.findOne({id: userAccess.id}, function(err , dbUserAccess) {    
  
    if(dbUserAccess == null) {
      console.log("I create new user!");
      dbUserAccess = new UserAccess(userAccess);      
    }   
  
    dbUserAccess.tokens = userAccess.tokens;    
    dbUserAccess.save();
    console.log("I saved user!");        
  });
  
});
