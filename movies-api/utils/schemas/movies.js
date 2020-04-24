const joi = require('@hapi/joi');

//aqui añado las caracteristicas de cada propiedad
const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const movieTitleSchema = joi.string().max(80); //el titulo sera string de max:80
const movieYearSchema = joi.number().min(1888).max(2077);//sera num desde 1880(primera peli) hasta 2077
const movieCoverSchema = joi.string().uri(); //es una url de la img
const movieDescriptionSchema = joi.string().max(300);
const movieDurationSchema =  joi.number().min(1).max(300);
const movieContentRatingSchema = joi.string().max(5); //maximo de 5 letras
const movieSourceSchema = joi.string().uri(); //link de la peli
const movieTagsSchema = joi.array().items(joi.string().max(50));//array de tags, cada tag max=50 letras


//con esto me aseguro q lo q se crea es con estos tipos de datos
const createMovieSchema = {
    title: movieTitleSchema.required(),
    year: movieYearSchema.required(),
    cover: movieCoverSchema.required(),
    description: movieDescriptionSchema.required(),
    duration: movieDurationSchema.required(),
    contentRating: movieContentRatingSchema.required(),
    source: movieSourceSchema.required(),
    tags: movieTagsSchema

};

//para actualizar no seran campos requeridos
const updateMovieSchema = {
    title: movieTitleSchema,
    year: movieYearSchema,
    cover: movieCoverSchema,    
    description: movieDescriptionSchema,
    duration: movieDurationSchema,
    contentRating: movieContentRatingSchema,
    source: movieSourceSchema,
    tags: movieTagsSchema
};


module.exports= {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
};


/*EXPLICACION REGEX
se validan los id de mongodb(los q se generan auto) con un regex
significa q:
- se inicia con cualquier caracter de 0 al 9.
- de la a a la f
- de la A a la F
- tamaño 24
 */