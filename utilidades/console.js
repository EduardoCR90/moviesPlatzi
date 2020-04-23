const fs = require('fs');

const out = fs.createWriteStream("./out.log");
const err = fs.createWriteStream("./err.log");

//creo nueva consola y le digo x parametro q lo q vaya
//a imprimir x clgLOG o clgINFO sea en out y los errores en err
const consoleFile = new console.Console(out, err);

setInterval(() =>{
    consoleFile.log(new Date());
    consoleFile.error(new Error("Esto es una error"));
}, 2000);

//esto es muy util para tener un registro de los logs y los errores
//en archivos separados