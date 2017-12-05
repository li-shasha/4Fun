/**
 * Created by sli on 12/5/2017.
 */

var Readable = require('stream').Readable;

// var rs = new Readable;
// rs.push('beep ');
// rs.push('boon\n');
// rs.push(null); // to tell rs it is end of output data.
// rs.pipe(process.stdout);

// var rs = Readable();
// var c = 97-1;
// rs._read = function() {
//     // rs.push(String.fromCharCode(c++));
//     if (c >'z'.charCodeAt(0)) rs.push(null);
//     setTimeout(function() {
//         rs.push(String.fromCharCode(++c))
//     },500)
// }
//
// rs.pipe(process.stdout);
//
// process.on('exit', function() {
//     console.error('\n_read() called ' + (c - 97) + ' times')
// });
//
// process.stdout.on('error', process.exit)

//consume0.js
//execute: $ (echo abc; sleep 1; echo def; sleep 1; echo ghi) | node readableStream
// process.stdin.on('readable', function() {
//     var buf = process.stdin.read(3);
//     console.dir(buf);
//     process.stdin.read(0)
// });

var offset = 0;
 process.stdin.on('readable', function() {
     var buf = process.stdin.read();
     console.log(buf)
     if(!buf) return;
     for(; offset < buf.length; offset++){
         if(buf[offset] == 0x0a) { //0x0a =\n 0x0d = \r
             console.dir(buf.slice(0, offset).toString());
             console.log('lisa:', buf.slice(0, offset).toString())
             buf = buf.slice(offset+1);
             offset = 0;
             process.stdin.unshift(buf);
             return;
         }
     }
     process.stdin.unshift(buf);
 })


