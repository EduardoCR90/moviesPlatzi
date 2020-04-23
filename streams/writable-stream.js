const {Writable} = require('stream');

const writableStream = new Writable({
    write(chunk, encoding, callback){
        console.log(chunk.toString());
        callback();
    }
});

//funcionalidad nativa q lee datos
process.stdin.pipe(writableStream);

//esto solo devuelve lo mismo lo q escribo.