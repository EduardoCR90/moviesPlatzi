const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');


class UsersService {
    constructor(){
        this.collection = 'users';
        this.mongoDB = new MongoLib();
    }

    //recibe un user, buscandolo mediante su email
    async getUser({email}){
        const [user] = await this.mongoDB.getAll(this.collection, {email});
        return user;
    }

    //
    async createUser({ user }) {
        const { name, email, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        //Crea el user y retorna su id como referencia
        const createUserId = await this.mongoDB.create(this.collection, {
          name,
          email,
          password: hashedPassword,
        });

        return createUserId;
      }
};

module.exports= UsersService;