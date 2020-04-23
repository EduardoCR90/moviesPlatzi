const { Transform } = require('stream');//transform es el mejor de los stream

const transformStream = new Transform({
    transform(chunk, encoding,cb){
        this.push(chunk.toString().toCamelize())//
        cb()
    }
})

String.prototype.toCamelize = function(){returnthis.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });}

process.stdin.pipe(transformStream).pipe(process.stdout)