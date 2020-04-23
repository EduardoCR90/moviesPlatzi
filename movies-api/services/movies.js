const {moviesMock} = require('../utils/mocks/movies');

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

module.exports = MoviesServices;