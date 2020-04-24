require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production', //add .trim() para npmrundev -- evita ejecutar codigo en production
    port: process.env.PORT || 3000, //buena practica lo de manejar el port en env
    cors: process.env.CORS,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME
}

module.exports= {config};