const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

//leo las variables de config (q ya han sido leidas de .env)
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology:true});
        this.dbName = DB_NAME;
    }

    //si ya hay cliente y conexion, se usaria la misma conexion para no sobrecargar el server
    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {//si hay err, devuelve reject con error
                        reject(err);
                    }
                    resolve(this.client.db(this.dbName));//sino, devuelve resolve conectado
                    console.log('Connected succesfully to Mongo!');
                });
            });
        }

        return MongoLib.connection;
    }

    //ACCIONES DE MONGO
    //Se pasa siempre la collection para poder trabajar con varias bd(no solo movies)
    //todos retornan la conexion con la promesa

    getAll(collection, query) {
        return this.connect()
            .then(db => {
                return db.collection(collection).find(query).toArray()//array es para pasarlo a json
            })
    }

    get(collection, id) {
        return this.connect()
            .then(db => {
                return db.collection(collection).findOne({ _id: ObjectId(id) })//Busca el id q le paso
            })
    }

    create(collection, data) {
        return this.connect()
            .then(db => {
                return db.collection(collection).insertOne(data)//inserta lo q le mando
            }).then(result => result.insertedId);
    }

    update(collection, id, data) {
        return this.connect()
            .then(db => {//busca si existe. si->lo edita, sino lo crea. x eso esta el upsert:true
                return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
            }).then(result => result.upsertedId || id);
    }

    delete(collection, id) {
        return this.connect()
            .then(db => {
                return db.collection(collection).deleteOne({ _id: ObjectId(id) })
            }).then(() => id); //devuelve el id del q borro
    }
}


module.exports = MongoLib;

//shif alt f para formatear codigo