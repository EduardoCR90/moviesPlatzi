const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

//CON ESTO SE BUSCA EL USER A PARTIR DEL EMAIL OBTENIDO DSD EL JWT
const UsersService = require('../../../services/users');
//con esto se verifica el token
const { config } = require('../../../config');

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()//recoge el bearer token del header
    },
    async function(tokenPayload, cb) {
      const usersService = new UsersService();

      try {
        const user = await usersService.getUser({ email: tokenPayload.email });//adkiere el email

        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        delete user.password;//si lo encuentra, elimina pass (nose xq)

        cb(null, { ...user, scopes: tokenPayload.scopes });//recoge scopes
      } catch (error) {
        return cb(error);
      }
    }
  )
);