const fs = require('fs');

const server = require('http').createServer();

server.on('request', (req,res)=>{
    fs.readFile("./big", (err, data)=>{
        if(err){
          console.log('error', err);

        }
        res.end(data);
    });
});

server.listen(3000);
//si esto se ejecuta asi, al ser un archivo grande,
//la carga de memoria es brutal y petaria el server.
//solucion --> stream-server