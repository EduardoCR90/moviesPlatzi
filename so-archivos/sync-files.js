const fs = require('fs');

try{
    const file = process.argv[2];//lee la tercera posicion introducida (node sync-files texto.txt(esta))
    const content = fs.readFileSync(file).toString();
    const lineas = content.split("\n").length;//cuenta los saltos de lineas
    console.log(lineas);

}catch(err){
        console.log(err);
};