const express = require('express');
const app = express();

const {config} = require('./config/index');
const moviesAPI = require('./routes/movies');

//body parser
app.use(express.json());

moviesAPI(app);


/*app.get('/', function(req,res){
    res.send("Hello again!");
});*/

/*app.get('/json', function(req,res){
    res.json({Hello: 'pero con un json'});
});*/

app.listen(config.port, function(){
    console.log(`Server on port ${config.port}.`);
});