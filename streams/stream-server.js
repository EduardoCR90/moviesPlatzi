const fs = require('fs');

const server = require('http').createServer();

server.on('request', (req,res)=>{
    const src = fs.createReadStream("./big");
    src.pipe(res);//esto escribe el stream(res)
});



server.listen(3000);
//Este codigo es el correcto para leer archivos grandes.
//No consume memoria