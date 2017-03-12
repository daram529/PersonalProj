var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
  fs.readFile('index.html', 'utf-8', function(err, data) {
    response.writeHead(200, {'ContentType':'text/html'});
    response.end(data);
  });
}).listen(8080, function() {
  console.log('Server Running....http://192.168.0.8:8080');
});
