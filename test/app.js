/**
 * Created by sli on 12/29/17.
 */

var http = require("http");
var Tokens = require('csrf');

var tokens = new Tokens();
var fs = require("fs");
var index = fs.readFileSync('test.html');


function parseCookies(request) {
    var list = {},
        rc= request.headers.cookie;

    rc && rc.split(";").forEach(function(cookie) {
        var parts = cookie.split("=");
        list[parts.shift().trim()]= decodeURI(parts.join("="));
    });

    return list;
}

var server = http.createServer((req, res) => {
    tokens.secret(function(err, secret) {
        console.log(secret)
        if (err) throw err;
        // res.writeHead(200, {'Content-Type':'text/html'});
        // res.end(index);
    })

    if (req.method === "POST") {
        if (req.url === "/api/dropDatabase"){
            var cookies = parseCookies(req);
            if (!tokens.verify(cookies.secret, cookies.token)) {
                throw new Error('invalid token!--')
            }
            res.end('data is being processed');
        }
    }
    if (req.method === "GET") {
            var secret = tokens.secretSync();
            var token = tokens.create(secret);
            res.setHeader('Set-Cookie', ['token='+token,'secret='+secret, "language=javascript"]);
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(index);
    }
});
server.listen(3000);








