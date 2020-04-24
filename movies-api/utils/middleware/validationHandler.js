//verifica la info introducida x el usuario (x ejemplo, partes requeridas o tipos de datos erroneos)
const boom = require('@hapi/boom');
const joi = require('@hapi/joi');


//recibe info a validar y schema
function validate(data, schema){
    const { error } = joi.object(schema).validate(data);//se lo paso a joi
    return error;
}


//si existe error, le paso el err a next y se lo envio : sino, siguiente middleware(sin err)
function validationHandler(schema, check ="body"){ //chequea body x defecto
    return function(req,res,next){
        const error = validate(req[check], schema);       
        error ? next(boom.badRequest(error))//datos no validos para boom 
        : next(); 
    };
}


module.exports= validationHandler;