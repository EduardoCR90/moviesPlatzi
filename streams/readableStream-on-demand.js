const {Readable} = require('stream');
const rs = new Readable({
    read(size){
        setTimeout(()=> {
            if(this.currentCharCode>90){
                this.push(null);
                return;
            }
            this.push(String.fromCharCode(this.currentCharCode++));//escribe el abc
        }, 100);
    }
});

rs.currentCharCode = 65;//primera letra del abc
rs.pipe(process.stdout);

