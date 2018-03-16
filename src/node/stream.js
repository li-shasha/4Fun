/**
 * Created by sli on 12/5/2017.
 */

var http = require("http");
var fs = require("fs");
var oppressor = require('oppressor');

var server = http.createServer(function(req, res) {
    // fs.readFile('../data/test.csv', function(err, data) {
    //   console.log(data.toString())
    //     res.end(data.toString());
    // })

    var stream = fs.createReadStream('../data/test.csv');
    stream.pipe(res);
    // stream.pipe(oppressor(req)).pipe(res)
})

server.listen(8000);