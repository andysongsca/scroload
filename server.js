var http = require('http');
var fs = require('fs');
var child_process = require('child_process');

http.createServer(function (request, response){
    console.log(request.url)
    fs.readFile('.' + request.url, function(err, data) {
        console.log(data);
        response.writeHead(200);
        response.end(data);
    });

}).listen(8080, "127.0.0.1");

console.log('Server running on port 8080.');
