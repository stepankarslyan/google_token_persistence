[![github link]](https://github.com/stepankarslyan/google_auth_token_persistence)

  Fast, scalable, high performance, minimalist, nodejs app 

## Dependencies

* Onicollet/zmq
* mongoose.js 
* mongoDB
* Optimist

## Performance


* Subscriber zmq socket connects to the tcp://localhost:[1112] port(by default)

```js

var subscriber = zmq.socket("sub");
subscriber.connect("tcp://localhost:1112");
subscriber.subscribe("");
console.log("Subscriber connecting to the localhost 1112...");

```
