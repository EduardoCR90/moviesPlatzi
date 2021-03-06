const express = require('express');
const passport = require('passport');
const MoviesService = require('../services/movies');

const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

// JWT strategy
require('../utils/auth/strategies/jwt');
//se añade passport a todas las rutas.

function moviesAPI(app) {
    const router = express.Router();
    app.use("/api/movies", router);
    const moviesService = new MoviesService();


    //RUTAS
    router.get("/", passport.authenticate('jwt', {session: false}), async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { tags } = req.query;//saco los tag del query y los paso a servicio
        try {
            const movies = await moviesService.getMovies({ tags });//aki los paso a servicio

            //throw new Error('Error getting movies!'); //para probar error

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });
        } catch (err) {
            next(err);
        }
    });

    //el middleware va entre la ruta y la funcion async
    router.get("/:movieId",passport.authenticate('jwt', {session: false}), validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) { //en el valhand()lo q digo es q el movieId tendra un schema y lo saco de params
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { movieId } = req.params; //extraigo el id del parametro
        try {
            const movies = await moviesService.getMovie({ movieId });//id pasado x param
            res.status(200).json({
                data: movies,
                message: 'movie retrieved'
            });
        } catch (err) {
            next(err);
        }
    });

    router.post("/", passport.authenticate('jwt', {session: false}), validationHandler(createMovieSchema), async function (req, res, next) {
        const { body: movie } = req;//recojo la peli del cuerpo (en postman lo envie x body)
        //y le asigno el nombre movie para mayor facilidad de lectura
        try {
            const createdMovieId = await moviesService.createMovie({ movie });
            res.status(201).json({
                data: createdMovieId,
                message: 'movies created'
            });
        } catch (err) {
            next(err);
        }
    });

    router.put("/:movieId", passport.authenticate('jwt', {session: false}), validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async function (req, res, next) {
        const { body: movie } = req;//recoge info del body para actualizar
        const { movieId } = req.params;//recoge id de param
        try {
            const updatedMovieId = await moviesService.updateMovie({ movieId, movie });//en ese id, meto esa movie
            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated'
            });
        } catch (err) {
            next(err);
        }
    });

    router.delete("/:movieId", passport.authenticate('jwt', {session: false}), validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params;
        try {
            const deletedMovieId = await moviesService.deleteMovie({ movieId });
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