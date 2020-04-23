const fs = require('fs');

const arg1= process.argv[2];

const arg2= process.argv[3];

fs.copyFile(arg1, arg2, error => {
    if (error) {
        console.log(error);
    }
    console.log(`${arg1} fue copiado como ${arg2}`);
})