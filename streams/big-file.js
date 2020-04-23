const fs = require('fs');

const file = fs.createWriteStream('./big');//creo archivo

for(let i=0; i<=1e3; i++){ //ie6 es numero grande
    file.write('Texto aleatorio jaja');
}

file.end();