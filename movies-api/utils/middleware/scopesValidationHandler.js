const boom = require('@hapi/boom');

//recibe los scope de las rutas
function scopesValidationHandler(allowedScopes) {
  return function(req, res, next) {
    if (!req.user || (req.user && !req.user.scopes)) {
      next(boom.unauthorized('Missing scopes'));//si no tienes scopes, fuera
    }

    const hasAccess = allowedScopes
      .map(allowedScope => req.user.scopes.includes(allowedScope))//busco el scope en los scope permitidos
      .find(allowed => Boolean(allowed));//devuelvo boolean

    if (hasAccess) {
      next();
    } else {
      next(boom.unauthorized('Insufficient scoopes'));
    }
  };
}

module.exports = scopesValidationHandler;