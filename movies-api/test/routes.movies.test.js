const assert = require('assert');
const proxyquire = require('proxyquire');

const {moviesMock, MoviesServiceMock}= require('../utils/mocks/movies');
const testServer = require('../utils/testServer');

describe('routes - movies', function(){
    const route = proxyquire('../routes/movies',{
        '../services/movies' : MoviesServiceMock
    });

    const request = testServer(route); //solo cargo esta ruta para testearla

    //Esto es lo q la consola contesta a npm run test
    describe('GET /movies', function() {
        it('should respond with status 200', function(done){
            request.get('/api/movies').expect(200, done);
        });

        it('should respond with the list of movies', function(done){
            request.get('/api/movies').end((err, res)=>{
                assert.deepEqual(res.body, {
                    data: moviesMock,
                    message: 'movies listed'
                });
                done();
            });
        });

    });
});

//estudiar a fondo los test.. ya q en este curso no lo explica
