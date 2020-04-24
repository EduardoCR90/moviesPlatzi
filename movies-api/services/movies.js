//const {moviesMock} = require('../utils/mocks/movies');
const MongoLib = require('../lib/mongo');

class MoviesServices {//defino los metodos http

    constructor(){
        this.collection= 'movies';
        this.mongoDB = new MongoLib();
    }


    async getMovies({tags}){
        const query = tags && {tags: {$in:tags}}; //si existen los tags ->  los tags q esten dentro de los tags q estoy pasando.
        const movies = await this.mongoDB.getAll(this.collection, query);
        return movies || [];
    }

    async getMovie({movieId}){
        const movie = await this.mongoDB.get(this.collection, movieId);
        return movie || {};
    }

    async createMovie({movie}){
        const createMovieId = await this.mongoDB.create(this.collection, movie);
        return createMovieId;
    }

    async deleteMovie({movieId}){
        const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
        return deletedMovieId;
    }

    async updateMovie({movieId, movie}){
        const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie);
        return updatedMovieId;
    }
}

module.exports = MoviesServices;





/*
TODO ESTO LO CREE EN UN PRINCIPIO PARA PROBAR LOS METODOS CON LOS MOCKS
CON ESTO FUNCIONAN EN POSTMAN. 
class MoviesServices {//defino los metodos http

    async getMovies(){
        const movies = await Promise.resolve(moviesMock);
        return movies || [];

    }

    async getMovie(){
        const movie = await Promise.resolve(moviesMock[0]);
        return movie || {};
    }

    async createMovie(){
        const createMovieId = await Promise.resolve(moviesMock[0].id);
        return createMovieId;
    }

    async deleteMovie(){
        const deletedMovieId = await Promise.resolve(moviesMock[0].id);
        return deletedMovieId;
    }

    async updateMovie(){
        const updatedMovieId = await Promise.resolve(moviesMock[0].id);
        return updatedMovieId;
    }
}


*/