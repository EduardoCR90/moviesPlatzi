const express = require('express');
const app = express();

//INICIALIZACIONES
const {config} = require('./config/index');
const authApi = require('./routes/auth')
const moviesAPI = require('./routes/movies');
const userMoviesAPI = require('./routes/userMovies');

const {
    logErrors,
    wrapErrors,
    errorHandler
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require ('./utils/middleware/notFoundHandler');
//importante pasar el notFoundHandler justo despues de las rutas


//body parser
app.use(express.json());


//RUTAS
authApi(app);
moviesAPI(app);
userMoviesAPI(app);
app.use(notFoundHandler);//catch 404


//ERRORS MIDDLEWARE
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


//inicio puerto
app.listen(config.port, function(){
    console.log(`Server on port ${config.port}.`);
});