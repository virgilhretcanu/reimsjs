
/**
 * Module dependencies.
 */

var jade = require('jade')
  , path = __dirname + '/form.jade'
  , str = require('fs').readFileSync(path, 'utf8')
  , fn = jade.compile(str, { filename: path, pretty: true });

var user = {
  name: 'TJ',
  email: 'tj@vision-media.ca',
  city: 'Victoria',
  province: 'BC'
};

//console.log(fn({ user: user }));


function show(response, postData) {
    console.log("Request handler 'start' was called.");

    var body = fn({ user: user });
    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

exports.show = show;