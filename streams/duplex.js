//con duplex adkiero readable y writable

const {Duplex} = require('stream');

const duplexStream = new Duplex({
    write(chunk, encoding, callback){
        console.log(chunk.toString());
        callback();
    },

    read(size){
        if(this.currentCharCode>90){
            this.push(null);
            return;
        }

        this.push(String.fromCharCode(this.currentCharCode++));
    }
});

duplexStream.currentCharCode=65;//letra a
process.stdin.pipe(duplexStream).pipe(process.stdout);
//sale abc tb