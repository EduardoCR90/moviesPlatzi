const express = require('express');
const passport = require('passport');
const UserMoviesService = require('../services/userMovies');

const validationHandler = require('../utils/middleware/validationHandler');

const movieIdSchema = require('../utils/schemas/movies');
const userIdSchema = require('../utils/schemas/users');
const createUserMovieSchema = require('../utils/schemas/userMovies');

// JWT strategy
require('../utils/auth/strategies/jwt');


function userMoviesApi(app) {
    const router = express.Router();
    app.use('api/user-movies', router);

    const userMoviesService = new UserMoviesService();

    //RUTAS
    router.get('/', passport.authenticate('jwt', {session: false}), validationHandler({ userId: userIdSchema }, 'query'),//recibe userId con su esquema y lo verifica en el query
        async function (req, res, next) {
            const { userId } = req.query;
            try {
                const userMovies = await userMoviesService.getUserMovies({ userId });
                res.status(200).json({
                    data: userMovies,
                    message: 'user movies listed'
                })
            } catch (error) {
                next(error);
            }
        });
    
    
        router.post("/", passport.authenticate('jwt', {session: false}), validationHandler(createUserMovieSchema), async function (req, res, next) {
            const { body: userMovie } = req;//idUser y idMovie que el user kiere agregar
            try {
                const createdUserMovieId = await userMoviesService.createUserMovie({ userMovie });
                res.status(201).json({
                    data: createdUserMovieId,
                    message: 'user movie created'
                });
            } catch (err) {
                next(err);
            }
        });


        router.delete("/:userMovieId", passport.authenticate('jwt', {session: false}), validationHandler({ userMovieId: movieIdSchema }, 'params'), 
            async function (req, res, next) {
            const { userMovieId } = req.params;
            try {
                const deletedUserMovieId = await userMoviesService.deleteUserMovie({ userMovieId });
                res.status(200).json({
                    data: deletedUserMovieId,
                    message: 'user movie deleted'
                });
            } catch (err) {
                next(err);
            }
        });

}


module.exports=userMoviesApi;