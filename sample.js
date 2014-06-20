var zmq = require("zmq");
var publisher = zmq.socket("pub");
publisher.bind("tcp://*:1112", function(err) {
  if(err)
    console.log(err)
  else
    console.log("Ok!")
    setTimeout(function() {
      publisher.send(JSON.stringify({id: "user id", tokens: {data: "5555"}}));
      console.log("Sending data to the subscribers...");
    }, 3000);
});




process.on('SIGINT', function() {
  publisher.close();
  console.log('\nClosed')
});
