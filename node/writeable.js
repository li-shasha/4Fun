/**
 * Created by sli on 12/5/2017.
 */
// var writeable = require('stream').Writable;
// var ws = writeable();
// ws._write = function(chunk, enc, next) {
//     console.dir(chunk);
//     next();
// }
// process.stdin.pipe(ws);

process.stdout.write('test test\n');

//drain
var fs = require('fs');
var ws = fs.createWriteStream('message.txt');

ws.write('beep ');
setTimeout(function() {
    ws.end('big data')
}, 1000)
