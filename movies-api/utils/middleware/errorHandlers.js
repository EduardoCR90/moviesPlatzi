const {config} = require('../../config');
const boom = require('@hapi/boom');

//para usar boom, hay q crear este middleware para q todos los errores sean boom
function wrapErrors(err, req, res,next){
    if(!err.isBoom){
        next(boom.badImplementation(err));
    }
    next(err);
}


function withErrorStack(error, stack){
    if(config.dev){//si estamos desarrollando, return err y stack
        return {...error, stack}//los ... es para usar boom
    }
    return error;//sino solo el error
}


function logErrors(err, req,res,next){
    console.log(err);
    next(err);//paso err a siguiente middleware
}


function errorHandler(err, req, res, next){ //eslint-disable-line
    const {
        output : {statusCode, payload}//info para boom
    } =err;   

    res.status(statusCode);//paso statuscode de boom
    res.json(withErrorStack(payload, err.stack));//res=json con info del error
}



module.exports= {
    logErrors,
    errorHandler,
    wrapErrors
}


//en funciones async SIEMPRE hay q capturar los errors, pasadolos
//en el next(err) al siguiente middleware :D 

/*
app.get("/", function(req, res, next) {
  Promise.resolve()
    .then(function() {
      throw new Error("BROKEN");
    })
    .catch(next); // Errores serán pasados a Express.
});
*/

//npm run dev (si hay error dice el stack del error)
//npm start (ahora estas en modo produccion, solo devuelve el mensaje de error editado x mi)