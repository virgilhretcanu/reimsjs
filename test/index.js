var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
//var testform = require("./form");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
//handle["/testform"] = testform.show;

server.start(router.route, handle);