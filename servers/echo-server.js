const http = require('http');
const server = http.createServer();

server.on('request', (req, res)=>{
    //res.statusCode=200;
    //res.setHeader('Content-Type', 'text-plain');
    if(req.method == 'POST' && req.url == "/echo"){//ruta /echo
        let body =[];
        req.on('data', chunk=>{
            body.push(chunk);
        })
        .on('end', ()=>{
            res.writeHead(200, {'Content-Type': 'text/plain'})//esto es lo mismo q lo de arriba
            body= Buffer.concat(body).toString();//necesario para leer el body(es un buffer)
            res.end(body);
        })
    }else{
        res.statusCode = 404;
        res.end();
    }
    
});



server.listen('8001');
console.log('Server on 8001');

//en postman - post - body- raw(para enviar datos) enviar
//Para ver respuesta es en params y deberia verse el mnsaje escrito en raw

//Con estos datos, crear un server q reciba tu fecha de nacimiento y te diga el dia de la semana q nacistes