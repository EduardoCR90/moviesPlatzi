const express = require('express');
//const { moviesMock } = require('../utils/mocks/movies'); //ahora accedo a esto mediante servicio
const MoviesService = require('../services/movies');

function moviesAPI(app) {
    const router = express.Router();
    app.use("/api/movies", router);
    const moviesService = new MoviesService();


    //RUTAS
    router.get("/", async function(req , res, next) {
        const {tags} = req.query;//saco los tag del query y los paso a servicio
        try {            
            //const movies = await Promise.resolve(moviesMock);(asi es sin servicio, ya lo cambie en el resto del codigo)
            const movies = await moviesService.getMovies({tags});//aki los paso a servicio
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });
        } catch (err) {
            next(err);
        }
    });

    router.get("/:movieId", async function(req , res, next) {
        const {movieId} = req.params; //extraigo el id del parametro
        try {
            const movies = await moviesService.getMovie({movieId});//id pasado x param
            res.status(200).json({
                data: movies,
                message: 'movie retrieved'
            });
        } catch (err) {
            next(err);
        }
    });

    router.post("/", async function(req , res, next) {
        const {body: movie} = req;//recojo la peli del cuerpo (en postman lo envie x body)
        //y le asigno el nombre movie para mayor facilidad de lectura
        try {
            const createdMovieId = await moviesService.createMovie({movie});
            res.status(201).json({
                data: createdMovieId,
                message: 'movies created'
            });
        } catch (err) {
            next(err);
        }
    });

    router.put("/:movieId", async function(req , res, next) {
        const {body: movie} = req;//recoge info del body para actualizar
        const {movieId} = req.params;//recoge id de param
        try {
            const updatedMovieId = await moviesService.updateMovie({movieId, movie});//en ese id, meto esa movie
            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated'
            });
        } catch (err) {
            next(err);
        }
    });

    router.delete("/:movieId", async function(req , res, next) {
        const {movieId} = req.params;
        try {
            const deletedMovieId = await moviesService.deleteMovie({movieId});
            res.status(200).json({
                data: deletedMovieId,
                message: 'movie deleted'
            });
        } catch (err) {
            next(err);
        }
    });
}

module.exports = moviesAPI;