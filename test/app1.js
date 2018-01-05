/**
 * Created by sli on 12/29/17.
 */
var http = require("http");
var fs = require("fs");
var index1 = fs.readFileSync('test1.html');


http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(index1);
}).listen(4000);
