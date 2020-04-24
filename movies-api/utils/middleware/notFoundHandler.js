const boom = require('@hapi/boom');

//error 404
function notFoundHandler(req, res){
    const {
        output: {statusCode, payload}// info para boom
    } = boom.notFound();

    res.status(statusCode).json(payload);
}


module.exports = notFoundHandler;