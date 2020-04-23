require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production', //evita ejecutar codigo en production
    port: process.env.PORT || 3000 //buena practica lo de manejar el port en env
}

module.exports= {config};