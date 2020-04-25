const MongoLib = require('../lib/mongo');

class userMoviesService{
    constructor(){
        this.collection= 'user-movies';
        this.MongoDB = new MongoLib();
    }

    async getUserMovies({userId}){
        const query = userId && {userId}; // = trae pelis de usuario q tngan como id el id del user
        const userMovies = await this.MongoDB.getAll(this.collection,query);//ejecuta orden
        
        return userMovies || []; //si no hay, devuelve vacio
    }

    async createUserMovie({userMovie}){
        const createdUserMovieId = await this.MongoDB.create(this.collection,userMovie);
        return createdUserMovieId;
    }

    async deleteUserMovie({userMovieId}){
        const deletedUserMovieId = await this.MongoDB.delete(this.collection,userMovieId);
        return deletedUserMovieId;

    }

}

module.exports=userMoviesService;