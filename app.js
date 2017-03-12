var http = require('http');
var fs = require('fs');
var jade = require('jade');

http.createServer(function(request, response) {
  fs.readFile('test.jade', 'utf-8', function(err, data) {
    var fn = jade.compile(data);
    response.writeHead(200, {'ContentType':'text.html'});
    response.end(fn());
  });
}).listen(8080, function() {
  console.log('Server Running....http://192.168.0.8:8080');
});
