
var jade = require('jade')
  , path = __dirname + '/index.jade'
  , str = require('fs').readFileSync(path, 'utf8')
  , jade = jade.compile(str, { filename: path, pretty: true })
  , stylus = require('stylus')
  , nib = require('nib')
  ,connect = require("connect");

  
function start(response, postData) {
    console.log("Request handler 'start' was called.");
    var html = jade({});
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(html);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(postData + "");
  response.end();
}



/*
function compile(str, path) {
   return stylus(str)
     .set('filename', path)
     .set('compress', true)
     .use(nib())
     .import('nib');
 }
*/
exports.start = start;
exports.upload = upload;